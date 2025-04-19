const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.level.update({
    where: { level: 1 },
    data: {
      obj1X: 0.6632, obj1Y: 0.7082,
      obj2X: 0.1589, obj2Y: 0.6474,
      obj3X: 0.8665, obj3Y: 0.8789
    }
  });

  await prisma.level.update({
    where: { level: 2 },
    data: {
      obj1X: 0.8064, obj1Y: 0.8043,
      obj2X: 0.3948, obj2Y: 0.5367,
      obj3X: 0.0512, obj3Y: 0.4233
    }
  });

  await prisma.level.update({
    where: { level: 3 },
    data: {
      obj1X: 0.6464, obj1Y: 0.8413,
      obj2X: 0.1459, obj2Y: 0.3613,
      obj3X: 0.4727, obj3Y: 0.5475
    }
  });

  await prisma.level.update({
    where: { level: 4 },
    data: {
      obj1X: 0.4948, obj1Y: 0.3682,
      obj2X: 0.5208, obj2Y: 0.5059,
      obj3X: 0.7917, obj3Y: 0.7959
    }
  });
}

main()
  .then(() => {
    console.log('✅ Seed completed with corrected percent values');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
