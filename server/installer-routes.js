import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Settings } from '../models/Settings.js';
import { sequelize } from '../database/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Check if application is already installed
const isInstalled = () => {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) return false;
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    return envContent.includes('DB_HOST') && envContent.includes('JWT_SECRET');
  } catch (error) {
    return false;
  }
};

// System checks endpoint
router.get('/system-checks', async (req, res) => {
  try {
    const checks = {
      nodeVersion: process.version,
      npmPackages: true,
      databaseConnection: false,
      filePermissions: true
    };

    // Test database connection
    try {
      await sequelize.authenticate();
      checks.databaseConnection = true;
    } catch (error) {
      checks.databaseConnection = false;
    }

    res.json({
      success: true,
      checks,
      installed: isInstalled()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to run system checks'
    });
  }
});

// Test database connection
router.post('/test-database', async (req, res) => {
  try {
    const { host, port, database, username, password } = req.body;

    // Test connection with provided credentials
    const testConfig = {
      host,
      port: parseInt(port),
      database,
      username,
      password,
      dialect: 'mysql'
    };

    const testSequelize = new (await import('sequelize')).default(
      database,
      username,
      password,
      {
        host,
        port: parseInt(port),
        dialect: 'mysql',
        logging: false
      }
    );

    await testSequelize.authenticate();
    await testSequelize.close();

    res.json({
      success: true,
      message: 'Database connection successful'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Database connection failed: ' + error.message
    });
  }
});

// Test Paystack connection
router.post('/test-paystack', async (req, res) => {
  try {
    const { secretKey, publicKey } = req.body;

    if (!secretKey || !publicKey) {
      return res.status(400).json({
        success: false,
        error: 'Paystack keys are required'
      });
    }

    // Test Paystack API
    const response = await fetch('https://api.paystack.co/transaction/verify/1234567890', {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Paystack secret key'
      });
    }

    res.json({
      success: true,
      message: 'Paystack connection successful'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Paystack connection failed: ' + error.message
    });
  }
});

// Install application
router.post('/install', async (req, res) => {
  try {
    const {
      database,
      paystack,
      admin
    } = req.body;

    // Create .env file
    const envContent = `# Database Configuration
DB_HOST=${database.host}
DB_USER=${database.username}
DB_PASSWORD=${database.password}
DB_NAME=${database.database}
DB_PORT=${database.port}

# JWT Configuration
JWT_SECRET=${generateSecret()}
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=production
FRONTEND_URL=${req.headers.origin}

# Paystack Configuration
PAYSTACK_SECRET_KEY=${paystack.secretKey}
PAYSTACK_PUBLIC_KEY=${paystack.publicKey}
PAYSTACK_WEBHOOK_SECRET=${paystack.webhookSecret || ''}

# Application Settings
APP_NAME=Gnacops Marketplace
APP_URL=${req.headers.origin}
`;

    const envPath = path.join(__dirname, '..', '.env');
    fs.writeFileSync(envPath, envContent);

    // Create database tables
    await sequelize.sync({ force: true });

    // Create admin user
    const hashedPassword = await bcrypt.hash(admin.password, 12);
    await User.create({
      firstName: admin.name,
      lastName: '',
      email: admin.email,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    // Create default settings
    const defaultSettings = [
      { key: 'app_name', value: 'GNACOPS Marketplace' },
      { key: 'app_url', value: req.headers.origin },
      { key: 'contact_email', value: admin.email },
      { key: 'currency', value: 'GHS' },
      { key: 'membership_fee', value: '200' },
      { key: 'paystack_test_mode', value: paystack.testMode ? 'true' : 'false' }
    ];

    for (const setting of defaultSettings) {
      await Settings.create(setting);
    }

    res.json({
      success: true,
      message: 'Installation completed successfully'
    });
  } catch (error) {
    console.error('Installation error:', error);
    res.status(500).json({
      success: false,
      error: 'Installation failed: ' + error.message
    });
  }
});

// Generate random secret
function generateSecret() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

export default router; 