const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app)
const Blog = require('../model/blog') 
const testHelper = require('./apiTestHelper')


beforeEach(async () => {
    await Blog.deleteMany({})    
    //await Blog.insertMany(BlogsToSave);        
    const blogsSaved = testHelper.initialBlogs.map(blog => new Blog(blog));
    const blogsArray = blogsSaved.map(blog => blog.save());
    await Promise.all(blogsArray);
}, 3000000)

test("can view all the blogs", async () => {
   const blogsViewed = await api
   .get('/api/blogs')
   .expect(200)
   .expect('Content-Type', /application\/json/)

   expect(blogsViewed.body).toHaveLength(3)

},10000)

test("property of the blog posts is named id", async () => {
    const blogsViewed = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)    
    
    expect(blogsViewed.body[0].id).toBeDefined()
 
 },10000)

test("can create a new blog", async () => {
    const newBlog = {
        title:"Greater things are yet to come",
        author:"Falade Bayo",
        url:"https://greaterfaladedbayo.com",
        likes:12434   
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const newBlogsInDB = await testHelper.blogsInDB()
    expect(newBlogsInDB).toHaveLength(testHelper.initialBlogs.length + 1)
})

test("if likes property is missing, it will default to the value 0", async () => {
    const newBlog = {
        title:"Greater things are yet to come",
        author:"Falade Bayo",
        url:"https://greaterfaladedbayo.com", 
    }

    const newlySavedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
    expect(newlySavedBlog.body.likes).toEqual(0)
})

test("if likes property is missing, it will default to the value 0", async () => {
    const newBlog = {
        author:"Falade Bayo",
        url:"https://greaterfaladedbayo.com", 
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
})



afterAll(async() => {
    await mongoose.connection.close();   
})
