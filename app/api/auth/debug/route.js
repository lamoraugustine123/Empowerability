import { NextResponse } from 'next/server'
import { getAllUsers } from '../../../../../lib/auth-utils'

export async function GET() {
  const users = getAllUsers()
  return NextResponse.json({
    users: users.map(user => ({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name
    }))
  })
}
