const Database = require('better-sqlite3');

const db = new Database('./data.db');

console.log('📊 Checking database schema...');

// Check users table structure
try {
  const tableInfo = db.prepare("PRAGMA table_info(users)").all();
  console.log('\n👥 Users table columns:');
  tableInfo.forEach(col => {
    console.log(`  - ${col.name} (${col.type})`);
  });
} catch (error) {
  console.log('❌ Error reading users table:', error.message);
}

// Check what users exist
try {
  const users = db.prepare('SELECT * FROM users').all();
  console.log('\n📧 Current users:');
  users.forEach(user => {
    console.log(`  - ${user.email}`);
    console.log(`    ID: ${user.id}`);
    console.log(`    Password hash: ${user.password_hash ? 'Set (' + user.password_hash.length + ' chars)' : 'Not set'}`);
    // Show all columns that exist
    Object.keys(user).forEach(key => {
      if (key !== 'password_hash') {
        console.log(`    ${key}: ${user[key]}`);
      }
    });
  });
} catch (error) {
  console.log('❌ Error reading users:', error.message);
}

db.close();
