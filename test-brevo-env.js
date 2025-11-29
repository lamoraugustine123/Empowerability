import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

console.log('🔍 ENVIRONMENT CHECK:');
console.log('BREVO_SMTP_KEY exists:', !!process.env.BREVO_SMTP_KEY);
console.log('BREVO_SMTP_KEY length:', process.env.BREVO_SMTP_KEY ? process.env.BREVO_SMTP_KEY.length : 0);
console.log('FROM_EMAIL:', process.env.FROM_EMAIL);

// Now test the email function
import { sendWelcomeEmail } from './lib/email-service.js';

async function test() {
  console.log('🚀 TESTING WITH PROPER ENV LOAD...');
  const result = await sendWelcomeEmail('lamoraugustine122@gmail.com', 'Test User');
  console.log('📊 RESULT:', result);
}

test();
