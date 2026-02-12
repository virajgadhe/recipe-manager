import dotenv from 'dotenv';

// Load environment variables for tests
dotenv.config();

// Optional: ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined for tests');
}
