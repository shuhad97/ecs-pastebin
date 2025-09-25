import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const pastes = await prisma.paste.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  console.log('All Pastes:')
  console.log(JSON.stringify(pastes, null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 