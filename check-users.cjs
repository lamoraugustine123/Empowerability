const Database = require('better-sqlite3');

function getDB() {
  const dbPath = './data.db';
  const db = new Database(dbPath);
  
  // Create users table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  return db;
}

const db = getDB();
const users = db.prepare('SELECT * FROM users').all();

console.log('📊 Users in database:');
if (users.length === 0) {
  console.log('❌ No users found. Creating test user...');
  
  const bcrypt = require('bcryptjs');
  const testEmail = 'test@example.com';
  const testPassword = 'Password123!';
  const hashedPassword = bcrypt.hashSync(testPassword, 12);
  
  try {
    db.prepare(`
      INSERT INTO users (email, password_hash, display_name) 
      VALUES (?, ?, ?)
    `).run(testEmail, hashedPassword, 'Test User');
    
    console.log('✅ Test user created:');
    console.log('   Email: test@example.com');
    console.log('   Password: Password123!');
  } catch (error) {
    console.log('Error creating user:', error.message);
  }
} else {
  users.forEach(user => {
    console.log(`📧 ${user.email} - ${user.display_name}`);
  });
}

db.close();
