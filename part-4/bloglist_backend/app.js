const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controller/blogs')
const middleware = require('./util/middleware')

morgan.token('body', (req) => JSON.stringify(req.body));

const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app


