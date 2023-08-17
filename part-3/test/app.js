const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
const middleware = require('./utils/middleware');

const notesRouter = require('./controller/notes');
const usersRouter = require('./controller/users');
const loginRouter = require('./controller/userLogin');

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'));
app.use(express.static('build'));

app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
