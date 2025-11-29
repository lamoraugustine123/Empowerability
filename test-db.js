const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'tmp', 'tokens.db');
console.log('Database path:', dbPath);

const db = new Database(dbPath);

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires INTEGER NOT NULL,
    used INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert test data
const token = 'test123';
const email = 'test@example.com';
const expires = Date.now() + 3600000;

db.prepare(`
  INSERT OR REPLACE INTO password_reset_tokens (token, email, expires, used)
  VALUES (?, ?, ?, 0)
`).run(token, email, expires);

// Read data back
const data = db.prepare('SELECT * FROM password_reset_tokens WHERE token = ?').get(token);
console.log('Test data:', data);

db.close();
console.log('✅ Database test completed');
