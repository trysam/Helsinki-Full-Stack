const Note = require('../models/note');

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

const nonExistingID = async () => {
  const newNote = {
    content: 'This will be deleted',
  };

  const note = await new Note(newNote);
  await note.save();
  await note.deleteOne();

  // eslint-disable-next-line no-underscore-dangle
  return note._id.toString();
};

const notesInDB = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingID,
  notesInDB,
};
