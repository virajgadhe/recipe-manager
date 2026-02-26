import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

if (!process.env.JWT_SECRET && !isTest) {
  throw new Error('JWT_SECRET is not defined');
}

export const JWT_SECRET: string = process.env.JWT_SECRET || 'test-secret';
