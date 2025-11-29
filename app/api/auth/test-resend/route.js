import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log('🧪 Testing Resend with real API key...');
    console.log('🔑 API Key:', process.env.RESEND_API_KEY ? 'Set' : 'Not set');
    
    const { data, error } = await resend.emails.send({
      from: 'EmpowerAbility <onboarding@resend.dev>',
      to: ['lamoraugustine6@gmail.com'],
      subject: '🎉 Resend Test Successful - EmpowerAbility',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #4361ee;">🚀 Resend is Working!</h1>
          <p>Congratulations! Your EmpowerAbility application can now send emails through Resend.</p>
          <p><strong>Test timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> EmpowerAbility</p>
          <p><strong>To:</strong> lamoraugustine6@gmail.com</p>
          <hr>
          <p style="color: #666;">
            This means password reset emails will now be delivered reliably.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend test failed:', error);
      return NextResponse.json({
        success: false,
        message: 'Resend test failed',
        error: error.message
      }, { status: 500 });
    }

    console.log('✅ Resend test email sent successfully!');
    console.log('📫 Email ID:', data.id);

    return NextResponse.json({
      success: true,
      message: '🎉 Resend is working! Check your email inbox for the test message.',
      emailId: data.id,
      details: {
        from: 'onboarding@resend.dev',
        to: 'lamoraugustine6@gmail.com',
        timestamp: new Date().toLocaleString()
      }
    });

  } catch (error) {
    console.error('❌ Resend test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Resend test failed',
      error: error.message
    }, { status: 500 });
  }
}
