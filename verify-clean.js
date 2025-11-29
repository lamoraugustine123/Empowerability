import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function verifyClean() {
  console.log('🔍 Verifying clean system...')
  
  // Check Prisma users
  const prismaUsers = await prisma.user.findMany()
  console.log('📊 Prisma users:', prismaUsers.length)
  prismaUsers.forEach(user => {
    console.log('   -', user.email)
  })
  
  // Check reset tokens
  const resetTokens = await prisma.passwordResetToken.findMany()
  console.log('🔐 Reset tokens:', resetTokens.length)
  
  // Check JSON users
  const jsonUsers = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
  console.log('📁 JSON users:', jsonUsers.length)
  jsonUsers.forEach(user => {
    console.log('   -', user.email)
  })
  
  console.log('')
  if (prismaUsers.length === 1 && jsonUsers.length === 1) {
    console.log('✅ System is clean and ready!')
    console.log('🎯 Demo account: demo@empowerability.com / demo123')
  } else {
    console.log('❌ System still has extra data')
  }
}

verifyClean()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
