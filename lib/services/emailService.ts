import nodemailer from 'nodemailer';

// Simple email service for development
export const sendPasswordResetEmail = async (email: string, userName: string, resetLink: string) => {
  try {
    // Create a test account (no setup required)
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '"AbilityConnect" <noreply@abilityconnect.com>',
      to: email,
      subject: 'Reset Your AbilityConnect Password',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #10b981;">Password Reset Request</h2>
          <p>Hello ${userName},</p>
          <p>You requested to reset your password. Click the link below:</p>
          <a href="${resetLink}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('📧 Email sent! Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return { 
      success: true, 
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

export const sendPasswordResetSuccessEmail = async (email: string, userName: string) => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '"AbilityConnect" <noreply@abilityconnect.com>',
      to: email,
      subject: 'Password Reset Successful',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #10b981;">Password Reset Successful</h2>
          <p>Hello ${userName},</p>
          <p>Your password has been successfully reset.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Success email sent! Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending success email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};
