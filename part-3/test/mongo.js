const mongoose = require('mongoose');
const logger = require('./utils/logger');

if (process.argv.length < 3) {
  logger.info('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://trysam2003:${password}@cluster0.f8r8rpb.mongodb.net/testnoteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'We are doing great',
  important: true,
});

note.save().then((result) => {
  logger.info('note saved!');
  logger.info(result);
  mongoose.connection.close();
});

/*
Note.find({ content: 'I need to fast-track the update' }).then((result) => {
  result.forEach((note) => {
    logger.info(note);
  });
  mongoose.connection.close();
});
*/
