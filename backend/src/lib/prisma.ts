import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not defined');
}

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

if (!globalForPrisma.prisma) {
  const adapter = new PrismaPg(globalForPrisma.pool);

  globalForPrisma.prisma = new PrismaClient({
    adapter,
  });
}

export const prisma = globalForPrisma.prisma;
export const prismaPool = globalForPrisma.pool;
