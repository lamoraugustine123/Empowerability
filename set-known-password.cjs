const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('./data.db');

// Set a password that YOU will know
const email = 'lamoraugustine122@gmail.com';
const password = 'AdminPassword123!'; // Change this to whatever you want

const hashedPassword = bcrypt.hashSync(password, 12);

// Update the user with the known password
const result = db.prepare('UPDATE users SET password_hash = ?, display_name = ? WHERE email = ?')
  .run(hashedPassword, 'Augustine', email);

if (result.changes > 0) {
  console.log('🎉 SUCCESS! Password set to known value:');
  console.log('📧 Email: lamoraugustine122@gmail.com');
  console.log('🔑 Password: AdminPassword123!');
  console.log('');
  console.log('You can now login with these credentials!');
  console.log('The database will properly verify this password.');
} else {
  console.log('❌ User not found');
}

db.close();
