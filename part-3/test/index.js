require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Note = require('./models/note');

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'));
app.use(express.static('build'));

app.get('/', (request, response) => {
  response.send('<h1>Welcome World</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then((note) => {
    if (note) { response.json(note); } else response.status(404).end();
  }).catch((error) => next(error));
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then((note) => {
    if (note) { response.json(note); } else response.status(404).end();
  }).catch((error) => next(error));
});

app.put('/api/notes/:id', (request, response) => {
  const { body } = request;
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => response.json(updatedNote));
});

app.post('/api/notes', (request, response, next) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => response.json(savedNote))
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
