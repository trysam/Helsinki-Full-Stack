require('dotenv').config()

const {PORT} = process.env;
const MONGODB_URI = process.env.MONGODB_URI.toString();

module.exports = {
    PORT,
    MONGODB_URI
}