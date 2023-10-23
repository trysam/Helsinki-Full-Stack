const testingRouter = require('express').Router()
const Note = require('../model/note')
const User = require('../model/user')
const Blog = require('../model/blog')


testingRouter.post('/reset', async(request, response) => {

    await Note.deleteMany({})
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
})

testingRouter.get('/', async(request, response) => {
    response.send('<h2>You are in testing api</h2>')
})

module.exports = testingRouter