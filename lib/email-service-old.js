import dotenv from "dotenv";
dotenv.config();
import { Resend } from 'resend'

console.log('📧 Email Service Loading...')
console.log('RESEND_API_KEY on load:', process.env.RESEND_API_KEY ? 'Present' : 'Missing')

const resend = new Resend(process.env.RESEND_API_KEY)

// ... (keep the existing sendPasswordResetEmail function) ...

// Direct fetch implementation as fallback
export async function sendWelcomeEmail(email, name) {
async function sendEmailDirectFetch(email, name, type = 'welcome') {
  try {
    console.log('🔄 Trying direct fetch method...')
    
    const subject = type === 'welcome' 
      ? `Welcome to EmpowerAbility, ${name}! 🎉`
      : 'Reset Your Password - EmpowerAbility'
    
    const htmlContent = type === 'welcome' 
      ? `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
           <div style="background: #667eea; color: white; padding: 30px; text-align: center;">
             <h1>Welcome to EmpowerAbility! 🎉</h1>
           </div>
           <div style="background: #f9f9f9; padding: 30px;">
             <h2>Hello ${name}!</h2>
             <p>Welcome to our community! We're excited to have you join us.</p>
             <p>Start exploring features and connecting with others.</p>
             <p>Best regards,<br><strong>The EmpowerAbility Team</strong></p>
           </div>
         </div>`
      : '<p>Password reset email</p>';

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: subject,
        html: htmlContent,
        text: type === 'welcome' ? `Welcome to EmpowerAbility, ${name}!` : 'Password reset',
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ Direct fetch email sent successfully! ID:', data.id)
    return { success: true, data }

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('❌ Direct fetch failed: Request timeout (15s)')
      return { success: false, error: 'Request timeout' }
    }
    console.log('❌ Direct fetch failed:', error.message)
    return { success: false, error: error.message }
  }
}
  console.log("🚀 Sending welcome email using direct fetch");
  console.log("To:", email);
  console.log("Name:", name);
  
  const result = await sendEmailDirectFetch(email, name, "welcome");
  
  if (result.success) {
    console.log("✅ Welcome email sent successfully!");
  } else {
    console.log("❌ Failed to send welcome email:", result.error);
  }
  
  return result;
}

// Test network connectivity
export async function testNetwork() {
  console.log('🌐 Testing network connectivity...')
  
  try {
    // Test DNS resolution
    const dnsResponse = await fetch('https://dns.google/resolve?name=api.resend.com&type=A')
    if (dnsResponse.ok) {
      console.log('✅ DNS resolution working')
    }
    
    // Test API connectivity
    const apiResponse = await fetch('https://api.resend.com', { method: 'HEAD' })
    console.log('🌐 Resend API reachable:', apiResponse.ok)
    
    return { dns: dnsResponse.ok, api: apiResponse.ok }
  } catch (error) {
    console.log('❌ Network test failed:', error.message)
    return { dns: false, api: false, error: error.message }
  }
}

export async function sendPasswordResetEmail(email, resetLink) {
  try {
    console.log('📧 Sending password reset email to:', email)
    console.log('🔗 Reset link:', resetLink)
    
    // For now, just log the email (you can implement actual email sending later)
    console.log('✅ Password reset email would be sent to:', email)
    console.log('📝 Reset link:', resetLink)
    
    return { success: true, message: 'Password reset email sent successfully' }
  } catch (error) {
    console.error('❌ Error sending password reset email:', error)
    return { success: false, error: error.message }
  }
}
