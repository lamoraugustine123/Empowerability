import { sendWelcomeEmail } from './lib/email-service.js';

async function testUnverified() {
  console.log('🚀 TESTING UNVERIFIED EMAIL...');
  const result = await sendWelcomeEmail('test@example.com', 'Test User');
  console.log('📊 UNVERIFIED TEST RESULT:', result);
}

testUnverified();
