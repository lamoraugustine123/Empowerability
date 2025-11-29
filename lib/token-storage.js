import { getDB } from './database';

export function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function storeToken(token, email) {
  const db = getDB();
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
  
  try {
    // First, get or create user
    let user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    if (!user) {
      // For demo, create a temporary user. In production, you'd have real user registration
      const result = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, 'temp_hash');
      user = { id: result.lastInsertRowid };
    }
    
    // Store the token
    const stmt = db.prepare(`
      INSERT INTO reset_tokens (token, user_id, expires_at) 
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(token, user.id, expiresAt);
    console.log('Token stored in database:', token, 'for email:', email);
    
    return true;
  } catch (error) {
    console.error('Error storing token in database:', error);
    return false;
  }
}

export function getToken(token) {
  const db = getDB();
  
  const stmt = db.prepare(`
    SELECT rt.*, u.email 
    FROM reset_tokens rt 
    JOIN users u ON rt.user_id = u.id 
    WHERE rt.token = ? AND rt.used = 0 AND rt.expires_at > ?
  `);
  
  const tokenData = stmt.get(token, Date.now());
  
  console.log('Looking up token in database:', token);
  console.log('Token found:', !!tokenData);
  
  return tokenData;
}

export function markTokenUsed(token) {
  const db = getDB();
  
  const stmt = db.prepare('UPDATE reset_tokens SET used = 1 WHERE token = ?');
  const result = stmt.run(token);
  
  console.log('Token marked as used:', token);
  
  return result.changes > 0;
}

export function cleanupExpiredTokens() {
  const db = getDB();
  const now = Date.now();
  const stmt = db.prepare('DELETE FROM reset_tokens WHERE expires_at < ? OR used = 1');
  const result = stmt.run(now);
  
  if (result.changes > 0) {
    console.log('Cleaned up', result.changes, 'expired tokens');
  }
}

export function getAllTokens() {
  const db = getDB();
  
  const stmt = db.prepare(`
    SELECT rt.*, u.email 
    FROM reset_tokens rt 
    JOIN users u ON rt.user_id = u.id 
    ORDER BY rt.created_at DESC
  `);
  
  const tokens = stmt.all();
  
  return tokens.map(token => ({
    ...token,
    valid: token.expires_at > Date.now() && token.used === 0,
    expires_formatted: new Date(token.expires_at).toLocaleString()
  }));
}
