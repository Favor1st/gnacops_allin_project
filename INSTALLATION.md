# GNACOPS Marketplace - Web Installer

This guide will help you install the GNACOPS Marketplace application using the web-based installer.

## 🚀 Quick Installation

### Prerequisites

Before starting the installation, ensure your server has:

- **Node.js 18+** installed
- **MySQL 8.0+** installed and running
- **Git** for cloning the repository
- **sudo** access for creating directories

### Step 1: Upload Files to Server

1. **Clone or upload the project files to your server**
   ```bash
   git clone <repository-url>
   cd gnacops_allin_project
   ```

2. **Install basic dependencies**
   ```bash
   npm install
   ```

### Step 2: Launch the Installer

1. **Start the installer**
   ```bash
   npm run installer
   ```

2. **Open your browser** and navigate to:
   ```
   http://your-server-ip:3000
   ```

3. **Follow the installation wizard** through the 4 steps:
   - System Check
   - Database Setup
   - Configuration
   - Installation

## 📋 Installation Steps

### Step 1: System Check

The installer will automatically check:
- ✅ Node.js version (requires 18+)
- ✅ MySQL availability
- ✅ File write permissions

All checks must pass before proceeding.

### Step 2: Database Setup

Configure your MySQL database:

- **Database Host**: Usually `localhost`
- **Database Port**: Usually `3306`
- **Database Name**: `gnacops_db` (or your preferred name)
- **Database User**: `root` or your MySQL username
- **Database Password**: Your MySQL password

Click "Test Connection" to verify the database settings.

### Step 3: Configuration

Configure your application:

#### General Settings
- **Application URL**: Your domain (e.g., `https://your-domain.com`)
- **Admin Email**: Default admin email address

#### Paystack Configuration
- **Secret Key**: Your Paystack secret key (starts with `sk_test_` or `sk_live_`)
- **Public Key**: Your Paystack public key (starts with `pk_test_` or `pk_live_`)

#### Security Settings
- **JWT Secret**: Auto-generated secure key (click "Generate" to regenerate)
- **Environment**: Choose `development` or `production`

### Step 4: Installation

The installer will automatically:

1. **Install dependencies** (`npm install`)
2. **Build the application** (`npm run build`)
3. **Create environment file** (`.env`)
4. **Setup database** (create tables and seed data)
5. **Create PM2 configuration** for production
6. **Create log directories**
7. **Mark installation as complete**

## 🔧 Post-Installation Setup

### 1. Configure Nginx (Optional but Recommended)

Create an Nginx configuration file:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Serve static files
    location / {
        root /path/to/your/project/dist;
        try_files $uri $uri/ /index.html;
        
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
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Start the Application

```bash
# Start with PM2 (recommended for production)
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Or start manually
npm start
```

### 3. Setup SSL Certificate (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔐 Default Admin Credentials

After installation, you can access the admin panel:

- **URL**: `https://your-domain.com/admin`
- **Email**: `admin@gnacops.org`
- **Password**: `admin123`

**⚠️ Important**: Change the default admin password immediately after first login!

## 🛠️ Troubleshooting

### Common Issues

1. **"Node.js version check failed"**
   - Install Node.js 18 or higher
   - Use nvm: `nvm install 18 && nvm use 18`

2. **"MySQL connection failed"**
   - Ensure MySQL is running: `sudo systemctl status mysql`
   - Check credentials and permissions
   - Create database user if needed

3. **"Permission denied"**
   - Ensure you have write permissions in the project directory
   - Run: `chmod -R 755 .`

4. **"Build failed"**
   - Check Node.js version: `node --version`
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Manual Installation

If the web installer fails, you can install manually:

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp env.example .env
# Edit .env with your configuration

# 3. Build application
npm run build

# 4. Setup database
npm run db:migrate

# 5. Start application
npm start
```

## 📞 Support

If you encounter issues:

1. Check the installation logs in the browser console
2. Review server logs: `pm2 logs` or `npm run server:dev`
3. Ensure all prerequisites are met
4. Try the manual installation process

## 🔄 Reinstalling

To reinstall the application:

1. **Stop the application**
   ```bash
   pm2 stop all
   ```

2. **Remove installation marker**
   ```bash
   rm .installed
   ```

3. **Clear database** (optional)
   ```bash
   mysql -u root -p
   DROP DATABASE gnacops_db;
   CREATE DATABASE gnacops_db;
   ```

4. **Restart installer**
   ```bash
   npm run installer
   ```

## 🎉 Success!

After successful installation:

- ✅ Application is running on your domain
- ✅ Admin panel is accessible
- ✅ Paystack integration is configured
- ✅ Database is set up with sample data
- ✅ PM2 process manager is configured

Your GNACOPS Marketplace is ready to use! 