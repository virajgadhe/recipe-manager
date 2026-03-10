import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATA_URL!,
  },
  migrations: {
    seed: 'ts-node ./prisma/seed.ts',
  },
});
