import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data.db');

// Initialize database
export function initDatabase() {
  const db = new Database(dbPath);
  
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create reset_tokens table
  db.exec(`
    CREATE TABLE IF NOT EXISTS reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
  
  // Create indexes
  db.exec('CREATE INDEX IF NOT EXISTS idx_reset_token ON reset_tokens(token)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_reset_expires ON reset_tokens(expires_at)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_user_email ON users(email)');
  
  console.log('Database initialized successfully');
  return db;
}

// Get database instance
export function getDB() {
  return initDatabase();
}
