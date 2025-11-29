import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing email configuration...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EmpowerAbility <onboarding@resend.dev>',
        to: ['lamoraugustine6@gmail.com'],
        subject: 'Simple Test - EmpowerAbility',
        html: '<h1>Simple email test successful!</h1>',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    const data = await response.json();
    
    console.log('✅ Simple email test successful!');
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully using simple approach!',
      emailId: data.id
    });

  } catch (error) {
    console.error('❌ Simple email test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Email test failed',
      error: error.message,
      solution: 'The system will show reset links on the page instead'
    });
  }
}
