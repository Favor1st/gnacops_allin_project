import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Check if already installed
const isInstalled = () => {
    try {
        return fs.existsSync(path.join(process.cwd(), '.installed'));
    } catch (error) {
        return false;
    }
};

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

// Check installation status
app.get('/api/installer/status', (req, res) => {
    res.json({
        success: true,
        installed: isInstalled()
    });
});

// Redirect to main app if already installed
app.get('/', (req, res) => {
    if (isInstalled()) {
        res.redirect('/app');
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Serve installer API endpoints
app.post('/api/installer/system-check', async (req, res) => {
    try {
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);

        const checks = {
            nodejs: false,
            mysql: false,
            permissions: false
        };

        // Check Node.js version
        try {
            const { stdout } = await execAsync('node --version');
            const version = stdout.trim().replace('v', '');
            const majorVersion = parseInt(version.split('.')[0]);
            checks.nodejs = majorVersion >= 18;
        } catch (error) {
            checks.nodejs = false;
        }

        // Check MySQL
        try {
            const mysql = await import('mysql2/promise');
            const connection = await mysql.default.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                port: 3306
            });
            await connection.end();
            checks.mysql = true;
        } catch (error) {
            checks.mysql = false;
        }

        // Check file permissions
        try {
            const testFile = path.join(process.cwd(), 'test-write.tmp');
            fs.writeFileSync(testFile, 'test');
            fs.unlinkSync(testFile);
            checks.permissions = true;
        } catch (error) {
            checks.permissions = false;
        }

        res.json({
            success: true,
            ...checks
        });

    } catch (error) {
        console.error('System check error:', error);
        res.status(500).json({
            success: false,
            error: 'System check failed'
        });
    }
});

app.post('/api/installer/test-database', async (req, res) => {
    try {
        const { host, port, database, username, password } = req.body;
        const mysql = await import('mysql2/promise');

        const connection = await mysql.default.createConnection({
            host,
            port: parseInt(port),
            user: username,
            password,
            database
        });

        await connection.end();

        res.json({
            success: true,
            message: 'Database connection successful'
        });

    } catch (error) {
        console.error('Database test error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/api/installer/install', async (req, res) => {
    try {
        if (isInstalled()) {
            return res.status(400).json({
                success: false,
                error: 'Application is already installed'
            });
        }

        const { database, config } = req.body;

        // Step 1: Install dependencies
        console.log('Installing dependencies...');
        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);
            await execAsync('npm install');
        } catch (error) {
            throw new Error('Failed to install dependencies: ' + error.message);
        }

        // Step 2: Build application
        console.log('Building application...');
        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);
            await execAsync('npm run build');
        } catch (error) {
            throw new Error('Failed to build application: ' + error.message);
        }

        // Step 3: Create .env file
        console.log('Creating environment file...');
        const envContent = `# Server Configuration
NODE_ENV=${config.environment}
PORT=5000
FRONTEND_URL=${config.appUrl}

# Database Configuration
DB_HOST=${database.host}
DB_PORT=${database.port}
DB_NAME=${database.database}
DB_USER=${database.username}
DB_PASSWORD=${database.password}

# JWT Configuration
JWT_SECRET=${config.jwtSecret}

# Paystack Configuration
PAYSTACK_SECRET_KEY=${config.paystackSecret}
PAYSTACK_PUBLIC_KEY=${config.paystackPublic}

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@gnacops.org
SMTP_PASS=
SMTP_FROM=noreply@gnacops.org

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Security Configuration
CORS_ORIGIN=${config.appUrl}
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Application Configuration
APP_NAME=GNACOPS Marketplace
APP_VERSION=1.0.0
MAINTENANCE_MODE=false
`;

        fs.writeFileSync(path.join(process.cwd(), '.env'), envContent);

        // Step 4: Create database and run migration
        console.log('Setting up database...');
        try {
            const mysql = await import('mysql2/promise');
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);

            // Create database if it doesn't exist
            const connection = await mysql.default.createConnection({
                host: database.host,
                port: parseInt(database.port),
                user: database.username,
                password: database.password
            });

            await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${database.database}\``);
            await connection.end();

            // Run migration
            await execAsync('npm run db:migrate');
        } catch (error) {
            throw new Error('Failed to setup database: ' + error.message);
        }

        // Step 5: Create PM2 ecosystem file
        console.log('Creating PM2 configuration...');
        const ecosystemContent = `module.exports = {
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
    time: true,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    watch: false,
    ignore_watch: ['node_modules', 'logs', '*.log'],
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};`;

        fs.writeFileSync(path.join(process.cwd(), 'ecosystem.config.js'), ecosystemContent);

        // Step 6: Create log directory
        console.log('Creating log directory...');
        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);
            await execAsync('sudo mkdir -p /var/log/gnacops');
            await execAsync('sudo chown $USER:$USER /var/log/gnacops');
        } catch (error) {
            console.warn('Could not create log directory:', error.message);
        }

        // Step 7: Mark as installed
        fs.writeFileSync(path.join(process.cwd(), '.installed'), new Date().toISOString());

        res.json({
            success: true,
            message: 'Installation completed successfully'
        });

    } catch (error) {
        console.error('Installation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 GNACOPS Installer running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to the URL above to start installation`);
}); 