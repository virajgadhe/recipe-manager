import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import app from './app';

const PORT = process.env.PORT || 4000;

console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
