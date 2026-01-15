import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seeds the database with test data for development.
 * WARNING: This will delete all existing user data!
 */
async function main() {
  // Safety check: prevent accidental execution in production
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seed script should not run in production!');
  }

  console.log('Seeding database...');

  // Clear existing data (for development only)
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      googleId: 'test-google-id-123',
      profile: {
        create: {
          experienceYears: 3,
          targetRole: 'Software Engineer',
          targetCompany: 'FAANG',
          preferredLanguage: 'typescript',
          skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log('Created test user:', testUser.email);
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
