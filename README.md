# GNACOPS Marketplace

A comprehensive marketplace application for the Ghana National Association of Community Pharmacists (GNACOPS) with integrated Paystack payment gateway, user management, and admin dashboard.

## Features

- **User Management**: Registration, authentication, and profile management
- **Payment Integration**: Paystack payment gateway for membership fees
- **Admin Dashboard**: Complete admin panel with settings management
- **Database**: MySQL database with Sequelize ORM
- **Security**: JWT authentication, rate limiting, and security headers
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for components
- React Router for navigation
- React Query for data fetching

### Backend
- Node.js with Express
- MySQL database with Sequelize ORM
- JWT authentication
- Paystack payment integration
- Nodemailer for email notifications
- PM2 for process management

### Infrastructure
- Nginx reverse proxy
- SSL/HTTPS support
- Rate limiting and security headers
- Automated deployment scripts

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gnacops_allin_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE gnacops_db;
   CREATE USER 'gnacops_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON gnacops_db.* TO 'gnacops_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Run database migration**
   ```bash
   npm run db:migrate
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Start backend server**
   ```bash
   npm run server:dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Default Admin Credentials
- Email: admin@gnacops.org
- Password: admin123

**⚠️ Important**: Change the default admin password after first login!

## VPS Deployment

### Automated Deployment

1. **Upload files to your VPS**
   ```bash
   scp -r . user@your-vps-ip:/home/user/gnacops
   ```

2. **SSH into your VPS**
   ```bash
   ssh user@your-vps-ip
   ```

3. **Make deployment script executable and run it**
   ```bash
   cd gnacops
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Configure environment variables**
   ```bash
   nano .env
   # Add your configuration
   ```

5. **Update domain in Nginx configuration**
   ```bash
   sudo nano /etc/nginx/sites-available/gnacops
   # Replace your-domain.com with your actual domain
   ```

6. **Restart services**
   ```bash
   sudo systemctl restart nginx
   pm2 restart all
   ```

### Manual Deployment

If you prefer manual deployment, follow these steps:

1. **Install system dependencies**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nginx mysql-server nodejs npm -y
   ```

2. **Set up MySQL**
   ```bash
   sudo mysql_secure_installation
   sudo mysql -e "CREATE DATABASE gnacops_db;"
   sudo mysql -e "CREATE USER 'gnacops_user'@'localhost' IDENTIFIED BY 'your_secure_password';"
   sudo mysql -e "GRANT ALL PRIVILEGES ON gnacops_db.* TO 'gnacops_user'@'localhost';"
   sudo mysql -e "FLUSH PRIVILEGES;"
   ```

3. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

4. **Deploy application**
   ```bash
   sudo mkdir -p /var/www/gnacops
   sudo chown $USER:$USER /var/www/gnacops
   cp -r . /var/www/gnacops/
   cd /var/www/gnacops
   npm install
   npm run build
   ```

5. **Configure environment**
   ```bash
   cp env.example .env
   nano .env  # Edit with your configuration
   ```

6. **Run database migration**
   ```bash
   npm run db:migrate
   ```

7. **Start application**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/gnacops
   sudo ln -s /etc/nginx/sites-available/gnacops /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Paystack Configuration

### Getting Paystack API Keys

1. Create a Paystack account at [paystack.com](https://paystack.com)
2. Go to your dashboard and navigate to Settings > API Keys
3. Copy your Secret Key and Public Key

### Environment Variables

Add these to your `.env` file:

```env
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
```

### Webhook Configuration

1. In your Paystack dashboard, go to Settings > Webhooks
2. Add webhook URL: `https://your-domain.com/api/payments/webhook`
3. Select events: `charge.success`, `charge.failed`

### Testing Payments

- Use test cards for development
- Test card number: `4084 0840 8408 4081`
- Expiry: Any future date
- CVV: Any 3 digits

## Database Schema

### Users Table
- User registration and authentication
- Role-based access (user, vendor, admin)
- Profile information and preferences

### Payments Table
- Payment transaction records
- Paystack integration data
- Payment status tracking

### Settings Table
- System configuration
- Payment gateway settings
- Email and notification settings

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `GET /api/payments/verify/:reference` - Verify payment
- `GET /api/payments/user` - Get user payments
- `POST /api/payments/webhook` - Paystack webhook

### Settings (Admin Only)
- `GET /api/settings` - Get all settings
- `PUT /api/settings/update` - Update settings
- `PUT /api/settings/paystack` - Update Paystack settings
- `POST /api/settings/paystack/test` - Test Paystack connection

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Security headers (Helmet)
- Input validation and sanitization
- SQL injection prevention with Sequelize

## Monitoring and Logs

### PM2 Monitoring
```bash
pm2 status
pm2 logs
pm2 monit
```

### Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Application Logs
```bash
tail -f /var/log/gnacops/combined.log
```

## SSL/HTTPS Setup

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get SSL certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Backup and Maintenance

### Database Backup
```bash
# Create backup
mysqldump -u gnacops_user -p gnacops_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
mysql -u gnacops_user -p gnacops_db < backup_file.sql
```

### Application Backup
```bash
# Backup application files
tar -czf gnacops_backup_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/gnacops
```

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check MySQL service: `sudo systemctl status mysql`
   - Verify credentials in `.env`
   - Check firewall settings

2. **Payment not working**
   - Verify Paystack API keys
   - Check webhook configuration
   - Review payment logs

3. **Nginx errors**
   - Check configuration: `sudo nginx -t`
   - Review error logs: `sudo tail -f /var/log/nginx/error.log`

4. **PM2 process not starting**
   - Check logs: `pm2 logs`
   - Restart: `pm2 restart all`
   - Check ecosystem config

### Performance Optimization

1. **Enable Nginx caching**
2. **Optimize database queries**
3. **Use CDN for static assets**
4. **Enable Gzip compression**

## Support

For support and questions:
- Email: support@gnacops.org
- Documentation: [docs.gnacops.org](https://docs.gnacops.org)
- Issues: GitHub Issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Made with ❤️ for GNACOPS**
