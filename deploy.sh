#!/bin/bash

# GNACOPS Marketplace Deployment Script
# This script sets up the application on a VPS server

set -e

echo "🚀 Starting GNACOPS Marketplace deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
print_status "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
print_status "Installing MySQL..."
sudo apt install mysql-server -y

# Secure MySQL installation
print_status "Securing MySQL installation..."
sudo mysql_secure_installation

# Install PM2 for process management
print_status "Installing PM2..."
sudo npm install -g pm2

# Install Nginx
print_status "Installing Nginx..."
sudo apt install nginx -y

# Create application directory
print_status "Creating application directory..."
sudo mkdir -p /var/www/gnacops
sudo chown $USER:$USER /var/www/gnacops

# Copy application files (assuming script is run from project directory)
print_status "Copying application files..."
cp -r . /var/www/gnacops/
cd /var/www/gnacops

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build the application
print_status "Building the application..."
npm run build

# Create environment file
print_status "Creating environment file..."
if [ ! -f .env ]; then
    cp env.example .env
    print_warning "Please edit .env file with your configuration"
fi

# Create MySQL database
print_status "Setting up MySQL database..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS gnacops_db;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'gnacops_user'@'localhost' IDENTIFIED BY 'your_secure_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON gnacops_db.* TO 'gnacops_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Run database migration
print_status "Running database migration..."
npm run db:migrate

# Create PM2 ecosystem file
print_status "Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'gnacops-api',
    script: 'server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/gnacops/error.log',
    out_file: '/var/log/gnacops/out.log',
    log_file: '/var/log/gnacops/combined.log',
    time: true
  }]
};
EOF

# Create log directory
sudo mkdir -p /var/log/gnacops
sudo chown $USER:$USER /var/log/gnacops

# Configure Nginx
print_status "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/gnacops << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Serve static files
    location / {
        root /var/www/gnacops/dist;
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:5000/api/health;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/gnacops /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start the application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configure firewall
print_status "Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# Create SSL certificate (optional - requires certbot)
print_status "Setting up SSL certificate..."
if command -v certbot &> /dev/null; then
    sudo certbot --nginx -d your-domain.com -d www.your-domain.com
else
    print_warning "Certbot not found. Please install it to enable SSL:"
    print_warning "sudo apt install certbot python3-certbot-nginx"
fi

# Restart Nginx
sudo systemctl restart nginx

# Create systemd service for PM2
print_status "Creating systemd service..."
pm2 startup systemd -u $USER --hp /home/$USER

print_status "Deployment completed successfully!"
echo ""
print_status "Next steps:"
echo "1. Edit the .env file with your configuration"
echo "2. Update the domain name in Nginx configuration"
echo "3. Configure your Paystack API keys"
echo "4. Set up SSL certificate with Let's Encrypt"
echo "5. Change the default admin password"
echo ""
print_status "Default admin credentials:"
echo "Email: admin@gnacops.org"
echo "Password: admin123"
echo ""
print_status "Application URLs:"
echo "Frontend: http://your-domain.com"
echo "API: http://your-domain.com/api"
echo "Health Check: http://your-domain.com/health" 