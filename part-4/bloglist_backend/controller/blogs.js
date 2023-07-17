const Blogs = require('../model/blog') 
const blogRouter = require('express').Router()

blogRouter.get('/welcome', (request, response) => {
    response.send("<h1>Dare Awokunle, your are doing great </h1>")
})

blogRouter.post('/', (request, response, next) =>{
    const { body } = request;
    const blog = new Blogs({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url       
    })

    blog.save().then(savedBlog => response.json(savedBlog)).catch(error => next(error))
})

blogRouter.get('/', (request, response, next) => {
    Blogs.find({}).then(blogs => response.json(blogs)).catch(error => next(error))
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

