import { NextResponse } from 'next/server'
import { updateUserPassword, getUserByEmail, createUser, validateResetToken, markTokenAsUsed } from '../../../../lib/auth-utils'

export async function POST(request) {
  try {
    const { token, email, password, confirmPassword } = await request.json()

    console.log('Reset password request for:', email)

    if (!token || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Validate the reset token
    const validToken = await validateResetToken(token)
    if (!validToken) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Check if user exists, if not create them
    let user = await getUserByEmail(email)
    if (!user) {
      console.log('User does not exist, creating new user:', email)
      user = await createUser(email, password)
    } else {
      console.log('User exists, updating password:', email)
      user = await updateUserPassword(email, password)
    }

    if (!user) {
      return NextResponse.json(
        { message: 'Error updating password' },
        { status: 500 }
      )
    }

    // Mark token as used
    await markTokenAsUsed(token)

    console.log('Password reset successful for:', email)
    return NextResponse.json({
      success: true,
      message: 'Password reset successfully'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { message: 'Error resetting password' },
      { status: 500 }
    )
  }
}
