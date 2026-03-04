import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 4000;

console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
