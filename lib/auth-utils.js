import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function getUserByEmail(email) {
  try {
    return await prisma.user.findUnique({
      where: { email }
    })
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

export async function createUser(userData) {
  const { email, password, name, phone, disabilityType, bio } = userData
  try {
    console.log('Creating user:', { email, name, phone, disabilityType })

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        phone,
        disabilityType,
        bio
      }
    })

    console.log('User created successfully:', user.email)
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    
    // If user already exists, return that error
    if (error.code === 'P2002') {
      throw error
    }
    return null
  }
}

export async function updateUserPassword(email, newPassword) {
  try {
    console.log('Updating password for:', email)
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })
    
    console.log('Password updated successfully for:', email)
    return user
  } catch (error) {
    console.error('Error updating password:', error)
    return null
  }
}

export async function createResetToken(userId) {
  try {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
    
    const resetToken = await prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expires
      }
    })
    
    return resetToken
  } catch (error) {
    console.error('Error creating reset token:', error)
    return null
  }
}

export async function validateResetToken(token) {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expires: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    })
    
    return resetToken
  } catch (error) {
    console.error('Error validating reset token:', error)
    return null
  }
}

export async function markTokenAsUsed(token) {
  try {
    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    })
  } catch (error) {
    console.error('Error marking token as used:', error)
  }
}

export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })
  } catch (error) {
    console.error('Error getting all users:', error)
    return []
  }
}

export async function getOrCreateUserForReset(email) {
  try {
    let user = await getUserByEmail(email)
    
    if (!user) {
      // Create a temporary user with a random password
      const tempPassword = Math.random().toString(36).slice(-8)
      user = await createUser({
        email,
        password: tempPassword,
        name: email.split('@')[0]
      })
    }
    
    return user
  } catch (error) {
    console.error('Error in getOrCreateUserForReset:', error)
    return null
  }
}

export async function verifyPassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    console.error('Error verifying password:', error)
    return false
  }
}
