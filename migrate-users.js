import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'

const prisma = new PrismaClient()

async function migrateUsers() {
  try {
    console.log('🔄 Migrating users from JSON to Prisma...')
    
    // Read users from JSON
    const usersJson = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
    console.log(`Found ${usersJson.length} users in JSON file`)
    
    let migratedCount = 0
    
    for (const jsonUser of usersJson) {
      // Check if user already exists in Prisma
      const existingUser = await prisma.user.findUnique({
        where: { email: jsonUser.email }
      })
      
      if (!existingUser) {
        // Create user in Prisma with temporary password
        const tempPassword = await bcrypt.hash('TempPassword123!', 12)
        
        await prisma.user.create({
          data: {
            email: jsonUser.email,
            password: tempPassword,
            name: jsonUser.name || jsonUser.email.split('@')[0]
          }
        })
        
        console.log(`✅ Migrated: ${jsonUser.email}`)
        migratedCount++
      } else {
        console.log(`⚠️ Already exists: ${jsonUser.email}`)
      }
    }
    
    console.log(`\n🎉 Migration complete!`)
    console.log(`Migrated ${migratedCount} users to Prisma`)
    console.log(`Temporary password for all migrated users: TempPassword123!`)
    console.log(`Users should reset their passwords after first login`)
    
  } catch (error) {
    console.error('Migration error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateUsers()
