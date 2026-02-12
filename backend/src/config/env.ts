import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const JWT_SECRET: string = process.env.JWT_SECRET;
