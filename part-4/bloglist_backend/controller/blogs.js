const Blogs = require('../model/blog') 
const User = require('../model/user')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const helper = require('../util/list_helper')


blogRouter.get('/welcome', (request, response) => {
    response.send("<h1>Dare Awokunle, your are doing great </h1>")
})


blogRouter.post('/', async (request, response) =>{
    const { body } = request;
    
    const authorization = helper.getTokenFrom(request)    
    const decodedToken = jwt.verify(authorization, process.env.SECRET)
 
    if (!decodedToken.id) {
        return response.status(401).json({error: 'invalidToken'})
    }
    
    const user = await User.findById(decodedToken.id)

    const blog = new Blogs({
        title: body.title,
        author: body.author,
        likes: body.likes || 0,
        url: body.url,
        users: user.id      
    })

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog)
})

blogRouter.get('/', async (request, response) => {
    const blogs = await Blogs.find({}).populate('users', {username:1, name:1})
    response.json(blogs)
})

blogRouter.get('/:id', (request, response, next) => {
    Blogs.findById(request.params.id)
        .then(blog => blog ? response.json(blog) : response.status(404).end)
        .catch(error => next(error))
})

blogRouter.put('/:id', async (request, response) => {
    const {body} = request
   
    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url        
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(request.params.id,blog, {new:true})
        response.status(201).json(updatedBlog);
        
})

blogRouter.delete('/:id', async (request, response) => {
    
    const token = helper.getTokenFrom(request)
    console.log(token)
    const userToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(userToken.id)
    const blogsArray = user.blogs.map(blog => blog.toString())
    
    if (blogsArray.includes(request.params.id.toString())){
       const deletedBlog = await Blogs.findByIdAndRemove(request.params.id)

       deletedBlog
            ? response.status(204).json(deletedBlog) 
            : response.status(404).end
            
    } else{ return response.status(401).json({error: "Not Authorized"})}        
   
})

module.exports = blogRouter;

