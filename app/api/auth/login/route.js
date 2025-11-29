import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '../../../../lib/auth-utils'
import { sendWelcomeEmail } from "@/lib/email-service";

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email:', email)

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in database
    const user = await getUserByEmail(email)
    console.log('User found in database:', user ? 'Yes' : 'No')
    
    if (!user) {
      console.log('=== LOGIN FAILED: User not found ===')
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('Stored hash exists:', !!user.password)

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('=== LOGIN FAILED: Password mismatch ===')
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('=== LOGIN SUCCESS ===')

    // Send welcome email in background with timeout protection
    setTimeout(async () => {
      try {
        console.log('🎉 Attempting to send welcome email...')
        const welcomeResult = await sendWelcomeEmail(user.email, user.name || user.email.split('@')[0])
        
        if (welcomeResult.success) {
          console.log('✅ Welcome email sent successfully')
        } else {
          console.log('ℹ️ Welcome email not sent:', welcomeResult.error?.message || 'Unknown error')
          // This is non-critical - login still succeeds
        }
      } catch (emailError) {
        console.log('ℹ️ Welcome email failed (non-critical):', emailError.message)
        // This is non-critical - login still succeeds
      }
    }, 100);

    // Login successful regardless of email outcome
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Error during login' },
      { status: 500 }
    )
  }
}
