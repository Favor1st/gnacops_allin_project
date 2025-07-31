import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

const PORT = 3000;

// Check if already installed
const isInstalled = () => {
    try {
        return fs.existsSync(path.join(process.cwd(), '.installed'));
    } catch (error) {
        return false;
    }
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Serve the installer HTML
    if (req.url === '/' || req.url === '/index.html') {
        const htmlPath = path.join(__dirname, 'index.html');
        if (fs.existsSync(htmlPath)) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync(htmlPath));
        } else {
            res.writeHead(404);
            res.end('Installer not found');
        }
        return;
    }

    // Serve the installer JavaScript
    if (req.url === '/installer.js') {
        const jsPath = path.join(__dirname, 'installer.js');
        if (fs.existsSync(jsPath)) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(fs.readFileSync(jsPath));
        } else {
            res.writeHead(404);
            res.end('Installer JS not found');
        }
        return;
    }

    // API endpoints
    if (req.url === '/api/installer/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            installed: isInstalled()
        }));
        return;
    }

    if (req.url === '/api/installer/system-check' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
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
                    const { stdout } = await execAsync('mysql --version');
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

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    ...checks
                }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: 'System check failed'
                }));
            }
        });
        return;
    }

    if (req.url === '/api/installer/test-database' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { host, port, database, username, password } = JSON.parse(body);
                
                // Simple database test using mysql command
                const testCmd = `mysql -h${host} -P${port} -u${username} -p${password} -e "SELECT 1"`;
                await execAsync(testCmd);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Database connection successful'
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: error.message
                }));
            }
        });
        return;
    }

    if (req.url === '/api/installer/install' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                if (isInstalled()) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: 'Application is already installed'
                    }));
                    return;
                }

                const { database, config } = JSON.parse(body);

                // Step 1: Install dependencies
                console.log('Installing dependencies...');
                try {
                    await execAsync('npm install');
                } catch (error) {
                    throw new Error('Failed to install dependencies: ' + error.message);
                }

                // Step 2: Build application
                console.log('Building application...');
                try {
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
                    // Create database if it doesn't exist
                    const createDbCmd = `mysql -h${database.host} -P${database.port} -u${database.username} -p${database.password} -e "CREATE DATABASE IF NOT EXISTS \`${database.database}\`"`;
                    await execAsync(createDbCmd);

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
                    await execAsync('sudo mkdir -p /var/log/gnacops');
                    await execAsync('sudo chown $USER:$USER /var/log/gnacops');
                } catch (error) {
                    console.warn('Could not create log directory:', error.message);
                }

                // Step 7: Mark as installed
                fs.writeFileSync(path.join(process.cwd(), '.installed'), new Date().toISOString());

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Installation completed successfully'
                }));

            } catch (error) {
                console.error('Installation error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: error.message
                }));
            }
        });
        return;
    }

    // Default response
    res.writeHead(404);
    res.end('Not found');
});

server.listen(PORT, () => {
    console.log(`🚀 GNACOPS Installer running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to the URL above to start installation`);
}); 