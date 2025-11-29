import { NextResponse } from 'next/server'
import { createUser } from '../../../../lib/auth-utils'
import { sendWelcomeEmail } from "@/lib/email-service";

export async function POST(request) {
  try {
    const { email, password, name, phone, disabilityType, bio } = await request.json()

    console.log('=== SIGNUP ATTEMPT ===')
    console.log('Email:', email)
    console.log('Name:', name)
    console.log('Phone:', phone || 'Not provided')
    console.log('Disability Type:', disabilityType || 'Not provided')
    console.log('Bio length:', bio ? bio.length : 0)

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Create user with all fields
    const user = await createUser({
      email, 
      password, 
      name,
      phone: phone || null,
      disabilityType: disabilityType || null,
      bio: bio || null
    })
    
    if (!user) {
      return NextResponse.json(
        { message: 'Error creating user account' },
        { status: 500 }
      )
    }

    console.log('=== SIGNUP SUCCESS ===')
    console.log('User created:', user.email)
    console.log('User ID:', user.id)

    // Send welcome email (non-blocking)
    try {
      console.log('🎉 Sending welcome email to new user...')
      const welcomeResult = await sendWelcomeEmail(user.email, user.name)
      if (welcomeResult.success) {
        console.log('✅ Welcome email sent successfully')
      } else {
        console.log('⚠️ Welcome email failed, but signup continues:', welcomeResult.error)
      }
    } catch (emailError) {
      console.log('⚠️ Welcome email error, but signup continues:', emailError)
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome email sent.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        disabilityType: user.disabilityType,
        bio: user.bio
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    
    // Handle specific errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'An account with this email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { message: 'Internal server error during account creation' },
      { status: 500 }
    )
  }
}
