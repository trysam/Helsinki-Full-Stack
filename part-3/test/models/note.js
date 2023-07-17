/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

mongoose.set('strictQuery', false);
logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to url'))
  .catch((error) => logger.info('error connecting to MongoDB:', error.message));

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
