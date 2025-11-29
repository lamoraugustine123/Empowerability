const fs = require('fs');

// Read the original file
let content = fs.readFileSync('./lib/auth-utils.js', 'utf8');

// The correct updateUserPassword function
const correctUpdatePassword = `export async function updateUserPassword(email, newPassword) {
  try {
    console.log('Updating password for:', email);
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    console.log('Password updated successfully for:', email);
    return user;
  } catch (error) {
    console.error('Error updating password:', error);
    return null;
  }
}`;

// Find and replace the broken updateUserPassword function
const updatePasswordStart = content.indexOf('export async function updateUserPassword');
if (updatePasswordStart !== -1) {
  // Find where this function should end (next export function)
  const nextFunction = content.indexOf('export async function', updatePasswordStart + 1);
  
  if (nextFunction !== -1) {
    const beforeFunction = content.substring(0, updatePasswordStart);
    const afterFunction = content.substring(nextFunction);
    content = beforeFunction + correctUpdatePassword + '\\n\\n' + afterFunction;
  }
}

fs.writeFileSync('./lib/auth-utils.js', content);
console.log('Successfully fixed updateUserPassword function');
