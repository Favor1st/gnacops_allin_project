import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection (Simple Version)...\n');
  
  // Check if .env file exists
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file found');
    
    // Read and parse .env file manually
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    });
    
    console.log('📋 Database Configuration:');
    console.log(`DB_HOST: ${envVars.DB_HOST || 'localhost'}`);
    console.log(`DB_PORT: ${envVars.DB_PORT || '3306'}`);
    console.log(`DB_NAME: ${envVars.DB_NAME || 'gnacops_db'}`);
    console.log(`DB_USER: ${envVars.DB_USER || 'root'}`);
    console.log(`DB_PASSWORD: ${envVars.DB_PASSWORD ? '***SET***' : '***NOT SET***'}`);
  } else {
    console.log('⚠️  .env file not found');
    console.log('📋 Using default configuration:');
    console.log('DB_HOST: localhost');
    console.log('DB_PORT: 3306');
    console.log('DB_NAME: gnacops_db');
    console.log('DB_USER: root');
    console.log('DB_PASSWORD: ***NOT SET***');
  }
  
  console.log('\n🔄 Testing MySQL service...');
  
  try {
    // Test 1: Check if MySQL is running
    const { stdout: mysqlStatus } = await execAsync('sudo systemctl status mysql --no-pager');
    if (mysqlStatus.includes('active (running)')) {
      console.log('✅ MySQL service is running');
    } else {
      console.log('❌ MySQL service is not running');
      console.log('💡 Run: sudo systemctl start mysql');
      return;
    }
    
    // Test 2: Check MySQL version
    const { stdout: mysqlVersion } = await execAsync('mysql --version');
    console.log('✅ MySQL version:', mysqlVersion.trim());
    
    // Test 3: Test MySQL connection
    console.log('\n🔄 Testing MySQL connection...');
    
    // Try to connect as root first
    try {
      await execAsync('mysql -u root -e "SELECT 1"');
      console.log('✅ MySQL root connection successful');
    } catch (error) {
      console.log('❌ MySQL root connection failed');
      console.log('💡 You may need to set up MySQL root password');
    }
    
    // Test 4: Check if database exists
    console.log('\n🔄 Checking database...');
    try {
      const { stdout: databases } = await execAsync('mysql -u root -e "SHOW DATABASES;"');
      const dbName = envVars.DB_NAME || 'gnacops_db';
      
      if (databases.includes(dbName)) {
        console.log(`✅ Database '${dbName}' exists`);
        
        // Check tables
        try {
          const { stdout: tables } = await execAsync(`mysql -u root -e "USE ${dbName}; SHOW TABLES;"`);
          const tableCount = (tables.match(/\n/g) || []).length - 1;
          console.log(`📊 Found ${tableCount} tables in database`);
        } catch (error) {
          console.log('⚠️  Could not check tables (database might be empty)');
        }
      } else {
        console.log(`⚠️  Database '${dbName}' does not exist`);
        console.log('💡 Run: sudo mysql -e "CREATE DATABASE IF NOT EXISTS ' + dbName + ';"');
      }
    } catch (error) {
      console.log('❌ Could not check databases:', error.message);
    }
    
    // Test 5: Test with specific user (if .env has credentials)
    if (envVars.DB_USER && envVars.DB_USER !== 'root') {
      console.log('\n🔄 Testing with specific user...');
      try {
        const passwordFlag = envVars.DB_PASSWORD ? `-p${envVars.DB_PASSWORD}` : '';
        await execAsync(`mysql -u ${envVars.DB_USER} ${passwordFlag} -e "SELECT 1"`);
        console.log(`✅ Connection with user '${envVars.DB_USER}' successful`);
      } catch (error) {
        console.log(`❌ Connection with user '${envVars.DB_USER}' failed`);
        console.log('💡 You may need to create this user or check permissions');
      }
    }
    
    console.log('\n🎉 Basic MySQL tests completed!');
    console.log('\n📖 Next steps:');
    console.log('1. If database doesn\'t exist: sudo mysql -e "CREATE DATABASE IF NOT EXISTS gnacops_db;"');
    console.log('2. If user doesn\'t exist: sudo mysql -e "CREATE USER IF NOT EXISTS \'gnacops_user\'@\'localhost\' IDENTIFIED BY \'password\';"');
    console.log('3. Grant permissions: sudo mysql -e "GRANT ALL PRIVILEGES ON gnacops_db.* TO \'gnacops_user\'@\'localhost\'; FLUSH PRIVILEGES;"');
    console.log('4. Run installer: node installer/simple-launch.js');
    
  } catch (error) {
    console.error('\n❌ Error during testing:', error.message);
    console.log('\n💡 Common solutions:');
    console.log('1. Install MySQL: sudo apt update && sudo apt install mysql-server');
    console.log('2. Start MySQL: sudo systemctl start mysql');
    console.log('3. Secure MySQL: sudo mysql_secure_installation');
  }
}

// Run the test
testDatabaseConnection(); 