const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/welcome', (request, response) => {
  response.send('<h1>Welcome World</h1>');
});

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const requestedNote = await Note.findById(request.params.id);
  if (requestedNote) { response.json(requestedNote); } else response.status(404).end();
});

notesRouter.delete('/:id', async (request, response) => {
  const deletedNote = await Note.findByIdAndDelete(request.params.id);
  if (deletedNote) { response.json(deletedNote); } else response.status(404).end();
});

notesRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
  response.json(updatedNote);
});

notesRouter.post('/', async (request, response) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

module.exports = notesRouter;
