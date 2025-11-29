import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function migrateUsersWithPasswords() {
  try {
    console.log('🔄 Migrating users from JSON to Prisma with passwords...')
    
    // Read users from JSON
    const usersJson = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
    console.log(`Found ${usersJson.length} users in JSON file`)
    
    let migratedCount = 0
    let skippedCount = 0
    
    for (const jsonUser of usersJson) {
      // Check if user already exists in Prisma
      const existingUser = await prisma.user.findUnique({
        where: { email: jsonUser.email }
      })
      
      if (!existingUser) {
        // Create user in Prisma with their actual password
        await prisma.user.create({
          data: {
            email: jsonUser.email,
            password: jsonUser.password, // Use the existing hashed password
            name: jsonUser.name || jsonUser.email.split('@')[0]
          }
        })
        
        console.log(`✅ Migrated: ${jsonUser.email}`)
        migratedCount++
      } else {
        console.log(`⚠️ Already exists: ${jsonUser.email}`)
        skippedCount++
      }
    }
    
    console.log(`\n🎉 Migration complete!`)
    console.log(`Migrated ${migratedCount} users to Prisma`)
    console.log(`Skipped ${skippedCount} existing users`)
    console.log(`Users can now login with their existing passwords!`)
    
  } catch (error) {
    console.error('Migration error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateUsersWithPasswords()
