const Blogs = require('../model/blog') 
const blogRouter = require('express').Router()

blogRouter.get('/welcome', (request, response) => {
    response.send("<h1>Dare Awokunle, your are doing great </h1>")
})

blogRouter.post('/', async (request, response) =>{
    const { body } = request;
    const blog = new Blogs({
        title: body.title,
        author: body.author,
        likes: body.likes || 0,
        url: body.url       
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.get('/', async (request, response) => {
    const blogs = await Blogs.find({})
    response.json(blogs)
})

blogRouter.get('/:id', (request, response, next) => {
    Blogs.findById(request.params.id)
        .then(blog => blog ? response.json(blog) : response.status(404).end)
        .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
    const {body} = request
    console.log(body)
    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url        
    }

    Blogs.findByIdAndUpdate(request.params.id,blog, {new:true})
        .then(updatedBlog => response.json(updatedBlog))
        .catch(error => next(error))
})

blogRouter.delete('/:id',(request, response, next) => {
    Blogs.findByIdAndRemove(request.params.id)
        .then(deletedBlog => deletedBlog ? response.json(deletedBlog) : response.status(404).end)
        .catch(error => next(error))
})

module.exports = blogRouter;

