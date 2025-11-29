import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding fresh database...')
  
  // Clear any existing data
  await prisma.passwordResetToken.deleteMany()
  await prisma.user.deleteMany()
  
  console.log('✅ Cleared all existing data')
  
  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@empowerability.com',
      password: hashedPassword,
      name: 'Demo User'
    }
  })
  
  console.log('✅ Demo user created:', demoUser.email)
  console.log('📝 Demo credentials:')
  console.log('   Email: demo@empowerability.com')
  console.log('   Password: demo123')
  console.log('')
  console.log('🎉 Database is now fresh and clean!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
