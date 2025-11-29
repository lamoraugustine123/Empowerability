const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('./data.db');

console.log('🔧 Setting known password for user...');

const email = 'lamoraugustine122@gmail.com';
const password = 'AdminPassword123!';
const hashedPassword = bcrypt.hashSync(password, 12);

try {
  // Update the user with the known password
  const result = db.prepare('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?')
    .run(hashedPassword, email);
  
  if (result.changes > 0) {
    console.log('✅ Password updated successfully!');
    console.log('');
    console.log('🎉 YOUR LOGIN CREDENTIALS:');
    console.log('📧 Email: lamoraugustine122@gmail.com');
    console.log('🔑 Password: AdminPassword123!');
    console.log('');
    console.log('You can now login with these exact credentials!');
  } else {
    console.log('❌ User not found');
  }
} catch (error) {
  console.log('❌ Error:', error.message);
}

db.close();
