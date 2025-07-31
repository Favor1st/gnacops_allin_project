# Database Connection Troubleshooting Guide

## Common Database Connection Issues

### 1. MySQL Service Not Running
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL if not running
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql
```

### 2. Database User Permissions
```bash
# Connect to MySQL as root
sudo mysql

# Create database and user
CREATE DATABASE IF NOT EXISTS gnacops_db;
CREATE USER IF NOT EXISTS 'gnacops_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON gnacops_db.* TO 'gnacops_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Test Database Connection
```bash
# Test connection with mysql command
mysql -h localhost -P 3306 -u gnacops_user -p gnacops_db

# Test connection with your credentials
mysql -h YOUR_HOST -P YOUR_PORT -u YOUR_USERNAME -p YOUR_DATABASE
```

### 4. Check Environment Variables
```bash
# Check if .env file exists
ls -la .env

# View .env file contents (masked)
cat .env | sed 's/=.*/=***/'

# Test environment variables
node -e "require('dotenv').config(); console.log('DB_HOST:', process.env.DB_HOST); console.log('DB_USER:', process.env.DB_USER); console.log('DB_NAME:', process.env.DB_NAME);"
```

### 5. Common Error Solutions

#### Error: "Access denied for user"
- **Solution**: Check username/password in .env file
- **Solution**: Ensure user has proper permissions

#### Error: "Can't connect to MySQL server"
- **Solution**: Check if MySQL is running
- **Solution**: Verify host and port in .env file

#### Error: "Unknown database"
- **Solution**: Create the database first
- **Solution**: Check database name in .env file

#### Error: "Connection timeout"
- **Solution**: Check firewall settings
- **Solution**: Verify MySQL is listening on correct port

### 6. Manual Database Setup
```bash
# Step 1: Install MySQL if not installed
sudo apt update
sudo apt install mysql-server

# Step 2: Secure MySQL installation
sudo mysql_secure_installation

# Step 3: Create database and user
sudo mysql -e "CREATE DATABASE IF NOT EXISTS gnacops_db;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'gnacops_user'@'localhost' IDENTIFIED BY 'your_secure_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON gnacops_db.* TO 'gnacops_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Step 4: Test connection
mysql -u gnacops_user -p gnacops_db
```

### 7. Environment File Template
Create a `.env` file with these settings:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gnacops_db
DB_USER=gnacops_user
DB_PASSWORD=your_secure_password
```

### 8. Test Connection Script
Run this to test your database connection:
```bash
node -e "
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gnacops_db'
    });
    
    console.log('✅ Database connection successful!');
    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testConnection();
"
```

### 9. Reset Database
If you need to start fresh:
```bash
# Drop and recreate database
sudo mysql -e "DROP DATABASE IF EXISTS gnacops_db;"
sudo mysql -e "CREATE DATABASE gnacops_db;"

# Run migration again
npm run db:migrate
```

### 10. Check MySQL Logs
```bash
# View MySQL error logs
sudo tail -f /var/log/mysql/error.log

# View MySQL general logs
sudo tail -f /var/log/mysql/mysql.log
```

## Quick Diagnostic Commands

```bash
# 1. Check MySQL status
sudo systemctl status mysql

# 2. Check if port 3306 is listening
sudo netstat -tlnp | grep 3306

# 3. Test MySQL connection
mysql -u root -p

# 4. Check environment variables
cat .env | grep DB_

# 5. Test with your specific credentials
mysql -h YOUR_HOST -P YOUR_PORT -u YOUR_USER -p
```

## Still Having Issues?

1. **Check the exact error message** you're getting
2. **Verify your .env file** has correct database credentials
3. **Test connection manually** using mysql command
4. **Check MySQL logs** for detailed error information
5. **Ensure MySQL is running** and accessible

## Support

If you're still experiencing issues, please provide:
- The exact error message
- Your .env file contents (with passwords masked)
- The output of `sudo systemctl status mysql`
- The output of `mysql --version` 