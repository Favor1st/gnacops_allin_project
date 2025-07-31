import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...\n');
  
  // Display current environment variables (masked)
  console.log('📋 Environment Variables:');
  console.log(`DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`DB_PORT: ${process.env.DB_PORT || 3306}`);
  console.log(`DB_NAME: ${process.env.DB_NAME || 'gnacops_db'}`);
  console.log(`DB_USER: ${process.env.DB_USER || 'root'}`);
  console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***'}`);
  console.log('');
  
  try {
    console.log('🔄 Attempting to connect...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gnacops_db',
      connectTimeout: 10000,
      acquireTimeout: 10000,
      timeout: 10000
    });
    
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query test successful:', rows[0]);
    
    // Check if database exists and has tables
    const [databases] = await connection.execute('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === (process.env.DB_NAME || 'gnacops_db'));
    
    if (dbExists) {
      console.log('✅ Database exists');
      
      // Check for tables
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`📊 Found ${tables.length} tables in database`);
      
      if (tables.length > 0) {
        console.log('📋 Tables:');
        tables.forEach(table => {
          console.log(`  - ${Object.values(table)[0]}`);
        });
      }
    } else {
      console.log('⚠️  Database does not exist');
    }
    
    await connection.end();
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('\n❌ Database connection failed!');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    // Provide specific solutions based on error
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution: MySQL service might not be running');
      console.log('   Run: sudo systemctl start mysql');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Solution: Check username/password in .env file');
      console.log('   Or create user: sudo mysql -e "CREATE USER IF NOT EXISTS \'gnacops_user\'@\'localhost\' IDENTIFIED BY \'password\';"');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Solution: Database does not exist');
      console.log('   Run: sudo mysql -e "CREATE DATABASE IF NOT EXISTS gnacops_db;"');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n💡 Solution: Connection timeout - check host/port in .env file');
    }
    
    console.log('\n📖 See DATABASE_TROUBLESHOOTING.md for detailed solutions');
  }
}

// Run the test
testDatabaseConnection(); 