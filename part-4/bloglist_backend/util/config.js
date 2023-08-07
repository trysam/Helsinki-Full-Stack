require('dotenv').config()

const {PORT} = process.env;
const MONGODB_URI = process.env.NODE_ENV === "test" 
                    ? process.env.MONGODB_TEST_URI.toString() 
                    : process.env.MONGODB_URI.toString();

module.exports = {
    PORT,
    MONGODB_URI
}