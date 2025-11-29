const fs = require('fs');
let content = fs.readFileSync('./lib/auth-utils.js', 'utf8');

// The correct markTokenAsUsed function
const correctMarkToken = `export async function markTokenAsUsed(token) {
  try {
    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    });
  } catch (error) {
    console.error('Error marking token as used:', error);
  }
}`;

// Find and replace the broken markTokenAsUsed function
const markTokenStart = content.indexOf('export async function markTokenAsUsed');
if (markTokenStart !== -1) {
  const nextFunction = content.indexOf('export async function', markTokenStart + 1);
  if (nextFunction !== -1) {
    const beforeFunction = content.substring(0, markTokenStart);
    const afterFunction = content.substring(nextFunction);
    content = beforeFunction + correctMarkToken + '\\n\\n' + afterFunction;
  }
}

fs.writeFileSync('./lib/auth-utils.js', content);
console.log('Fixed markTokenAsUsed function');
