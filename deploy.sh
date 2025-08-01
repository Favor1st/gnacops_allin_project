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
APP_DIR="/home/$USER/gnacops-marketplace"
print_status "Creating application directory: $APP_DIR"
mkdir -p $APP_DIR
cd $APP_DIR

# Clone the repository (if not already present)
if [ ! -d "gnacops_allin_project" ]; then
    print_status "Cloning repository..."
    git clone https://github.com/Favor1st/gnacops_allin_project.git
fi

cd gnacops_allin_project

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build the application
print_status "Building the application..."
npm run build

# Create .env file
print_status "Creating .env file..."
if [ ! -f ".env" ]; then
    cp env.example .env
    print_warning "Please edit the .env file with your configuration"
fi

# Create database
print_status "Setting up database..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS gnacops_db;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'gnacops_user'@'localhost' IDENTIFIED BY 'your_secure_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON gnacops_db.* TO 'gnacops_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Run database migrations
print_status "Running database migrations..."
npm run db:migrate

# Configure Nginx
print_status "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/gnacops-marketplace << EOF
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/gnacops-marketplace /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Configure PM2
print_status "Configuring PM2..."
pm2 start npm --name "gnacops-marketplace" -- start
pm2 save
pm2 startup

# Configure firewall
print_status "Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Install SSL certificate (optional)
print_status "Installing SSL certificate..."
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com

print_status "Deployment completed successfully!"
print_status "Your application should be available at: http://your-domain.com"
print_warning "Don't forget to:"
print_warning "1. Edit the .env file with your configuration"
print_warning "2. Update the domain name in Nginx configuration"
print_warning "3. Set up your Paystack API keys"
print_warning "4. Configure your database credentials"

echo ""
print_status "To start the application: pm2 start gnacops-marketplace"
print_status "To view logs: pm2 logs gnacops-marketplace"
print_status "To restart: pm2 restart gnacops-marketplace" 