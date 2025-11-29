import { Resend } from 'resend'

const resend = new Resend('re_ArE1H6T4_9UvvHQc9SCGNRuNH6KiQhCC4')

async function testEmail() {
  try {
    console.log('🧪 Testing email service with your API key...')
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'lamoraugustine122@gmail.com', // You can change this to your email
      subject: 'Test Email from EmpowerAbility',
      html: '<strong>Congratulations! Your email service is working! 🎉</strong>',
      text: 'Congratulations! Your email service is working! 🎉',
    })

    if (error) {
      console.log('❌ Email test failed:')
      console.log('Error:', error)
      return
    }

    console.log('✅ Email test SUCCESS!')
    console.log('Email ID:', data.id)
    console.log('Check your email inbox!')
    
  } catch (error) {
    console.log('❌ Unexpected error:')
    console.log(error)
  }
}

testEmail()
