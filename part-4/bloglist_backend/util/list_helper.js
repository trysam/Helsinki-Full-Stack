const _ = require('lodash');

const dummy = (blogs) => {
    blogs
    return 1
};

const totalLikes = (blogs) => blogs.reduce(((sum, blog) => sum + blog.likes), 0)

const favouriteLikes = (blogs) => {
    const maxLikes = Math.max(...blogs.map(item => item.likes))
    const favouriteBlog = blogs.filter(blog => blog.likes === maxLikes)[0]
    return _.omit(favouriteBlog, ["__v", "_id", "url"])     
}

const highestBlogsAuthor = (blogs) => {
    const authorBlogFrequency = _.countBy(blogs, "author")    
    const maxBlogs = _.max(_.values(authorBlogFrequency))    
    return {
        author: Object.keys(authorBlogFrequency).find(key => authorBlogFrequency[key] === maxBlogs),
        blogs: maxBlogs
    }  
}

const mostLikeAuthor = (blogs) => {
    const sumOfLikes = (likesCount, blog) => {
        likesCount[blog.author] = (likesCount[blog.author] || 0) +  blog.likes;
        return likesCount
    }
    const totalLikesByAuthor = _.reduce(blogs, sumOfLikes, {}) 

    const maxLikes = _.max(_.values(totalLikesByAuthor)) 

    return {
        author: Object.keys(totalLikesByAuthor).find(key => totalLikesByAuthor[key] === maxLikes),
        likes: maxLikes
    }      
}




module.exports = {
    dummy,
    totalLikes,
    favouriteLikes,
    highestBlogsAuthor,
    mostLikeAuthor
};