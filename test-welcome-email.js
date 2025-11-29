import { sendWelcomeEmail } from './lib/email-service.js';
import dotenv from 'dotenv';

dotenv.config();

async function testWelcomeEmail() {
  console.log('🔧 Testing Welcome Email Function...');
  
  const result = await sendWelcomeEmail('lamoraugustine122@gmail.com', 'Test User');
  
  console.log('📦 Final result:', result);
}

testWelcomeEmail();
