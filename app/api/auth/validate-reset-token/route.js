import { NextResponse } from 'next/server'
import { validateResetToken } from '../../../../lib/auth-utils'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  console.log('Validating token:', token)

  if (!token) {
    return NextResponse.json(
      { message: 'Reset token is required' },
      { status: 400 }
    )
  }

  try {
    // Validate the token using database
    const validToken = await validateResetToken(token)
    
    if (!validToken) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Return user email associated with the token
    const userEmail = validToken.user.email
    
    console.log('Token valid for user:', userEmail)
    return NextResponse.json({
      valid: true,
      email: userEmail,
      message: 'Token is valid'
    })

  } catch (error) {
    console.error('Error validating token:', error)
    return NextResponse.json(
      { message: 'Error validating token' },
      { status: 500 }
    )
  }
}
