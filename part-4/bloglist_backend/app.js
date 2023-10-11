const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('express-async-errors')
const middleware = require('./util/middleware')

const blogRouter = require('./controller/blogs')
const notesRouter = require('./controller/notes')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/userLogin')

const logger = require('./util/logger')
const config = require('./util/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB Server'))
    .catch(error => logger.info('error connecting to MongDB', error.message))


morgan.token('body', (req) => JSON.stringify(req.body));

const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)



app.use('/api/blogs', middleware.userExtractorFromToken, blogRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app


