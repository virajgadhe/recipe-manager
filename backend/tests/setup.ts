import { prisma, prismaPool } from '../src/lib/prisma';

afterAll(async () => {
  await prisma.$disconnect(); // close Prisma
  await prismaPool.end(); // close pg Pool
});
