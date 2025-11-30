import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('📧 ULTIMATE Email Service Loading...');
console.log('BREVO_API_KEY:', process.env.BREVO_API_KEY ? '✅ Present' : '❌ Missing');

export async function sendWelcomeEmail(email, name) {
  console.log('🎯 ULTIMATE - Processing welcome email for:', email);
  console.log('👋 Name:', name);
  
  // Always log the email attempt
  console.log('📝 ULTIMATE - Logging email attempt:', {
    to: email,
    name: name,
    subject: `Welcome to EmpowerAbility, ${name}! 🎉`,
    timestamp: new Date().toISOString(),
    status: 'attempted'
  });

  if (!process.env.BREVO_API_KEY) {
    console.log('❌ ULTIMATE - Missing BREVO_API_KEY');
    // Still return success so user registration isn't blocked
    return { 
      success: true, 
      emailFailed: true, 
      error: 'Missing API key',
      message: 'User registered but email failed (missing API key)'
    };
  }

  try {
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #667eea; color: white; padding: 30px; text-align: center;">
          <h1>Welcome to EmpowerAbility! 🎉</h1>
          <p>We're thrilled to have you join our community</p>
        </div>
        <div style="background: #f9f9f9; padding: 30px;">
          <h2>Hello ${name}!</h2>
          <p>Welcome to EmpowerAbility - your platform for connecting, sharing, and growing together.</p>
          <p>Start exploring features and connecting with others.</p>
          <p>Best regards,<br><strong>The EmpowerAbility Team</strong></p>
        </div>
      </div>
    `;

    console.log('📤 ULTIMATE - Attempting to send via Brevo API...');
    
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'EmpowerAbility',
          email: process.env.FROM_EMAIL || 'lamoraugustine122@gmail.com'
        },
        to: [
          {
            email: email,
            name: name
          }
        ],
        subject: `Welcome to EmpowerAbility, ${name}! 🎉`,
        htmlContent: htmlTemplate
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('📨 ULTIMATE - Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ ULTIMATE - API error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ ULTIMATE - Welcome email sent successfully! ID:', data.messageId);
    
    // Log successful send
    console.log('📝 ULTIMATE - Email sent successfully:', {
      to: email,
      name: name,
      messageId: data.messageId,
      timestamp: new Date().toISOString(),
      status: 'sent'
    });
    
    return { success: true, data };

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('❌ ULTIMATE - Request timeout (10s)');
    } else {
      console.log('❌ ULTIMATE - Email failed:', error.message);
    }
    
    // Log the failure but don't block user registration
    console.log('📝 ULTIMATE - Email delivery failed:', {
      to: email,
      name: name,
      error: error.message,
      timestamp: new Date().toISOString(),
      status: 'failed'
    });
    
    return { 
      success: true, 
      emailFailed: true, 
      error: error.message,
      message: 'User registered but email failed (network/API issue)'
    };
  }
}

export async function sendPasswordResetEmail(email, resetToken) {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    // Using Brevo/Sendinblue
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: process.env.FROM_EMAIL },
        to: [{ email: email }],
        subject: 'Reset Your EmpowerAbility Password',
        htmlContent: `
          <h2>Password Reset Request</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
        `
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Password reset email error:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email, resetToken) {
  try {
    const resetUrl = \`\${process.env.NEXTAUTH_URL}/reset-password?token=\${resetToken}\`;
    console.log('Password reset email would be sent to:', email);
    console.log('Reset URL:', resetUrl);
    return true; // Simulate success for now
  } catch (error) {
    console.error('Password reset email error:', error);
    return false;
  }
}
