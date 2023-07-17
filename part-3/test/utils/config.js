require('dotenv').config();

const { PORT } = process.env;
const MONGODB_URI = process.env.MODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
};
