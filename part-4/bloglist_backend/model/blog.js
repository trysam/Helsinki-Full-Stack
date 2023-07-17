const config = require('../util/config')
const logger = require('../util/logger')

const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB Server'))
    .catch(error => logger.info('error connecting to MongDB', error.message))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
       type: Number,
       required: true
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Blog', blogSchema);
