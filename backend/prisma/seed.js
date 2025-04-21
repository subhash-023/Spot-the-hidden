const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  const levels = [
    {
      id: 'cd53ccdd-cec0-4ad9-9b98-7ed3a82cc582',
      level: 1,
      name: 'Static Dreams',
      obj1Name: 'Cigarette',
      obj2Name: 'Lucy',
      obj3Name: 'tomb',
      obj1X: 0.6632,
      obj1Y: 0.7082,
      obj2X: 0.1589,
      obj2Y: 0.6474,
      obj3X: 0.8665,
      obj3Y: 0.8789
    },
    {
      id: 'a09a46dd-bb95-49da-acda-b1328fe7827d',
      level: 2,
      name: 'Dragon Isle',
      obj1Name: 'Feeder',
      obj2Name: 'Steve',
      obj3Name: 'Chuck Noland',
      obj1X: 0.8064,
      obj1Y: 0.8043,
      obj2X: 0.3948,
      obj2Y: 0.5367,
      obj3X: 0.0512,
      obj3Y: 0.4233
    },
    {
      id: 'f856d0b4-8195-4219-9e45-26c253e6cf69',
      level: 3,
      name: 'Multiverse Chaos',
      obj1Name: 'Spider Man',
      obj2Name: 'Brian',
      obj3Name: 'Rabbit',
      obj1X: 0.6464,
      obj1Y: 0.8413,
      obj2X: 0.1459,
      obj2Y: 0.3613,
      obj3X: 0.4727,
      obj3Y: 0.5475
    },
    {
      id: '108ce4d9-be5f-48e2-8c9f-cd528982924',
      level: 4,
      name: 'Robot City',
      obj1Name: 'Dr.Evil',
      obj2Name: 'Ghost Face',
      obj3Name: 'Earthworm Jim',
      obj1X: 0.4948,
      obj1Y: 0.3682,
      obj2X: 0.5208,
      obj2Y: 0.5059,
      obj3X: 0.7917,
      obj3Y: 0.7959
    }
  ];

  // Use createMany to insert all records in one transaction
  // or create each one individually if you prefer
  for (const level of levels) {
    await prisma.level.upsert({
      where: { id: level.id },
      update: level,
      create: level,
    });
  }

  console.log(`Database has been seeded with ${levels.length} levels.`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma client connection
    await prisma.$disconnect();
  });