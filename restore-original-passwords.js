import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function restoreOriginalPasswords() {
  try {
    console.log('🔄 Restoring original passwords...')
    
    // Read original passwords from JSON
    const usersJson = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
    
    for (const jsonUser of usersJson) {
      // Update user in Prisma with original password hash
      await prisma.user.update({
        where: { email: jsonUser.email },
        data: { password: jsonUser.password }
      })
      
      console.log(`✅ Password restored for: ${jsonUser.email}`)
    }
    
    console.log(`\n🎉 Password restoration complete!`)
    console.log(`All users can now login with their original passwords`)
    
  } catch (error) {
    console.error('Password restoration error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

restoreOriginalPasswords()
