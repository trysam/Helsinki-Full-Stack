const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const middleware = require('./utils/middleware');
const notesRouter = require('./controller/notes');

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'));
app.use(express.static('build'));

app.use(middleware.requestLogger);
app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
