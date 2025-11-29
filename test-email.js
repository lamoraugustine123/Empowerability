import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
  console.log('🔧 Testing Resend Email Service...');
  console.log('📧 RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
  console.log('📧 RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL);
  
  if (!process.env.RESEND_API_KEY) {
    console.log('❌ RESEND_API_KEY is missing!');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log('📤 Attempting to send test email...');
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: 'lamoraugustine122@gmail.com',
      subject: 'Test Email from Resend',
      html: '<strong>This is a test email from Resend!</strong>',
      text: 'This is a test email from Resend!'
    });

    if (error) {
      console.log('❌ Resend error:', error);
      return;
    }

    console.log('✅ Email sent successfully!');
    console.log('📦 Response data:', data);
    
  } catch (err) {
    console.log('❌ Unexpected error:', err);
  }
}

testEmail();
