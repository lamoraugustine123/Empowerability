import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('🧪 Testing email configuration...');
    console.log('📧 Email:', process.env.EMAIL_SERVER_USER);
    console.log('🔑 Password length:', process.env.EMAIL_SERVER_PASSWORD?.length);
    console.log('🏠 Host:', process.env.EMAIL_SERVER_HOST);
    console.log('🚪 Port:', process.env.EMAIL_SERVER_PORT);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      debug: true,
      logger: true,
    });

    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER,
      subject: 'Test Email from EmpowerAbility',
      text: 'This is a test email from your EmpowerAbility application.',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Test Email Successful! 🎉</h2>
          <p>If you're reading this, your email configuration is working correctly.</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>To:</strong> ${process.env.EMAIL_SERVER_USER}</p>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('📫 Message ID:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    let userMessage = 'Email configuration failed. ';
    
    if (error.code === 'EAUTH') {
      userMessage = 'Gmail authentication failed. Please check your app password and 2FA settings.';
    } else if (error.code === 'ECONNECTION') {
      userMessage = 'Cannot connect to Gmail. Check your internet connection.';
    } else {
      userMessage = `Email error: ${error.message}`;
    }

    return NextResponse.json({
      success: false,
      message: userMessage,
      error: error.message,
      code: error.code
    }, { status: 500 });
  }
}
