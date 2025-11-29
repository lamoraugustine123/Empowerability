import { sendWelcomeEmail } from './lib/email-service-new.js';

async function testNewEmail() {
  console.log('🔧 Testing NEW Welcome Email Function...');
  const result = await sendWelcomeEmail('lamoraugustine122@gmail.com', 'Test User');
  console.log('📦 Final result:', result);
}

testNewEmail();
