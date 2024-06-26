import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const testUser = await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      provider: 'LOCAL',
      username: 'test',
      password: 'test',
    },
  })

  console.log({ testUser })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
