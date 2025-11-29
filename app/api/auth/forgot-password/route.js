import { NextResponse } from 'next/server'
import { getOrCreateUserForReset, createResetToken } from '../../../../lib/auth-utils'
import { sendPasswordResetEmail } from '../../../../lib/email-service'

export async function POST(request) {
  try {
    const { email } = await request.json()

    console.log('=== FORGOT PASSWORD REQUEST ===')
    console.log('Email:', email)
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // Get or create user
    const user = await getOrCreateUserForReset(email)
    
    if (!user) {
      return NextResponse.json(
        { message: 'Error processing your request' },
        { status: 500 }
      )
    }

    console.log('User for reset:', user.email)

    // Create a real reset token in database
    const resetToken = await createResetToken(user.id)
    
    // Use dynamic port - get from request headers or environment
    const baseUrl = process.env.NEXTAUTH_URL || 
                   (request.headers.get('origin') || 'http://localhost:3001')
    const resetLink = `${baseUrl}/reset-password?token=${resetToken.token}`

    console.log('Generated reset token:', resetToken.token)
    console.log('Reset link:', resetLink)
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)

    // Send email with reset link
    console.log('📧 Attempting to send email...')
    const emailResult = await sendPasswordResetEmail(email, resetLink)

    console.log('Email sending result:', emailResult)

    if (!emailResult.success) {
      console.error('❌ Failed to send email:', emailResult.error)
      return NextResponse.json({
        success: false,
        message: 'Reset instructions have been sent to your email',
        emailSent: false,
        resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined,
        error: 'Email service temporarily unavailable'
      })
    }

    // Success - email sent
    console.log('✅ Email sent successfully!')
    return NextResponse.json({
      success: true,
      message: 'Reset instructions have been sent to your email',
      emailSent: true
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { message: 'Error sending reset instructions. Please try again.' },
      { status: 500 }
    )
  }
}
