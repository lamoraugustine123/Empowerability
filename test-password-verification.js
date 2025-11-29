import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testPasswordVerification() {
  try {
    console.log('🔐 Testing password verification...')
    
    const user = await prisma.user.findUnique({
      where: { email: 'giftyballasi@gmail.com' }
    })
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    console.log('User found:', user.email)
    console.log('Stored password hash:', user.password)
    console.log('Hash algorithm:', user.password.substring(0, 3))
    
    // Test with a known wrong password
    const wrongPasswordTest = await bcrypt.compare('wrongpassword', user.password)
    console.log('Wrong password test (should be false):', wrongPasswordTest)
    
    console.log('\n💡 If login fails, try these passwords:')
    console.log('1. The password you used during signup')
    console.log('2. Common passwords you might have used')
    console.log('3. If nothing works, use the forgot password feature')
    
  } catch (error) {
    console.error('Test error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testPasswordVerification()
