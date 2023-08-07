const blogModel = require('../model/blog')

const initialBlogs = [
    {
        title:"Holy spirit my great teacher",
        author:"Kenneth Heagin",
        url:"https://thingsaregettungbetter.com",
        likes:1234
    },

    {
       title:"I can do all things through Christ that strenghten me",
       author:"Paul Apostle",
       url:"https://icandoallthings.com",
       likes:350
    },

    {
        title:"Things are getting better",
        author:"Paul Fooly",
        url:"https://thingsaregettungbetter.com",
        likes:1234
    }

]

const blogsInDB = async () => {
    const Blogs = await blogModel.find({})
    return Blogs.map(blog => blog.toJSON())
 
}

module.exports = {
    initialBlogs,
    blogsInDB
}