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

const idNotInDB = async () => {
    const newBlog = {
        "title":"blog is deleted immediately",
        "author": "Paul Fooly",
        "likes": "1234",
        "url": "https://thingsaregettungbetter.com"       
    }

    const blogToDelete = await new blogModel(newBlog);
    await blogToDelete.save();
    await blogToDelete.deleteOne();

    return blogToDelete._id.toString()
}

const usersLoginDetails = [
    {
        username: "stonewire",
        password: "pass1word"
    },

    {
        username: "Tunderline",
        password: "pass2word"
    }

]


module.exports = {
    initialBlogs,
    blogsInDB,
    idNotInDB,
    usersLoginDetails

}