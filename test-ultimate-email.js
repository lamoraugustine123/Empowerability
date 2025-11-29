import { sendWelcomeEmail } from './lib/email-service.js';

async function testUltimate() {
  console.log('🚀 ULTIMATE EMAIL TEST STARTING...');
  
  const result = await sendWelcomeEmail('lamoraugustine122@gmail.com', 'Ultimate Test User');
  
  console.log('📊 ULTIMATE TEST RESULT:', result);
  
  if (result.success) {
    console.log('🎉 ULTIMATE TEST PASSED! Email sent successfully.');
  } else {
    console.log('💥 ULTIMATE TEST FAILED:', result.error);
  }
}

testUltimate();
