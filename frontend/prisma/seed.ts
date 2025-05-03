import { PrismaClient } from '@prisma/client'
import { mockBuildGuides, mockUserBuilds } from '../lib/mock-data' // adjust path if needed

const prisma = new PrismaClient()

// Helper to create/find a user by name
async function getOrCreateUser(name: string) {
  const email = `${name.toLowerCase().replace(/\s+/g, '')}@example.com`
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: null,
      },
    })
  }
  return user
}

async function seedBuildGuides() {
  for (const guide of mockBuildGuides) {
    const author = await getOrCreateUser(guide.author)
    await prisma.buildGuide.create({
      data: {
        id: guide.id,
        title: guide.title,
        description: guide.description,
        difficulty: guide.difficulty,
        estimatedTime: guide.estimatedTime,
        authorId: author.id,
        date: new Date(guide.date),
        likes: guide.likes,
        views: guide.views,
        components: {
          create: guide.components.map((componentId) => ({
            component: { connect: { id: componentId } },
          })),
        },
        // Uncomment and adapt if you add images to guides:
        // images: { create: guide.images?.map(url => ({ url })) || [] }
      },
    })
  }
}

async function seedUserBuilds() {
  for (const build of mockUserBuilds) {
    const author = await getOrCreateUser(build.author)
    await prisma.userBuild.create({
      data: {
        id: build.id,
        title: build.title,
        description: build.description,
        authorId: author.id,
        date: new Date(build.date),
        likes: build.likes,
        commentsCount: build.comments,
        components: {
          create: build.components.map((componentId) => ({
            component: { connect: { id: componentId } },
          })),
        },
        images: {
          create: build.images.map((url: string) => ({ url })),
        },
      },
    })
  }
}

async function main() {
  await seedBuildGuides()
  await seedUserBuilds()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
