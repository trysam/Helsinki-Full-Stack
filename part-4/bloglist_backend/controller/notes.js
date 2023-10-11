const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router();
const Note = require('../model/note');
const User = require('../model/user');
const helper = require('../util/list_helper')

notesRouter.get('/welcome', (request, response) => {
  response.send('<h1>Welcome World</h1>');
});

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { name: 1, username: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const requestedNote = await Note.findById(request.params.id);
  if (requestedNote) { response.json(requestedNote); } else response.status(404).end();
});

notesRouter.delete('/:id', async (request, response) => {
  const deletedNote = await Note.findByIdAndDelete(request.params.id);
  if (deletedNote) { response.status(204).json(deletedNote); } else response.status(404).end();
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


// eslint-disable-next-line consistent-return
notesRouter.post('/', async (request, response) => {
  const { body } = request;

  const decodedToken = jwt.verify(helper.getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  // eslint-disable-next-line no-underscore-dangle
  user.note = user.note.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

module.exports = notesRouter;
