require('dotenv').config();

const { PORT } = process.env;
const url = process.env.MONGODB_URI.toString();

module.exports = {
  PORT,
  url,
};
