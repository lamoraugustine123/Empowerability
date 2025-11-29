import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('📊 Checking all users in Prisma database...')
  
  const users = await prisma.user.findMany()
  console.log('Total users:', users.length)
  
  users.forEach(user => {
    console.log(`- ${user.email} (ID: ${user.id}, Created: ${user.createdAt})`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
