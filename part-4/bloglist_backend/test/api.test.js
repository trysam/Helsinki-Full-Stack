const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app)
const Blog = require('../model/blog') 
const User = require('../model/user');

const testHelper = require('./apiTestHelper');




beforeEach(async () => {
    await Blog.deleteMany({}) 
    await User.deleteMany({})   
    await Blog.insertMany(testHelper.initialBlogs);

    testHelper.usersLoginDetails[0].passwordHash = await bcrypt.hash("pass1word", 10)
    testHelper.usersLoginDetails[1].passwordHash = await bcrypt.hash("pass2word", 10)

    await User.insertMany(testHelper.usersLoginDetails);        
    // const blogsSaved = testHelper.initialBlogs.map(blog => new Blog(blog));
    // const blogsArray = blogsSaved.map(blog => blog.save());
    // await Promise.all(blogsArray);
}, 30000000)

describe('when blogs initially in DB', () => {
    test("can view all the blogs", async () => {
    const blogsViewed = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(blogsViewed.body).toHaveLength(3)

    },300000)

    test("property of the blog posts is named id", async () => {
        const blogsViewed = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)    
        
        expect(blogsViewed.body[0].id).toBeDefined()
    
    },300000)
})

describe("creating new blog", () => {
    test("can create a new blog", async () => {
        const newBlog = {
            title:"Greater things are yet to come",
            author:"Falade Bayo",
            url:"https://greaterfaladedbayo.com",
            likes:12434   
        }        

        const firstUser = await api
            .post('/api/login')
            .send(testHelper.usersLoginDetails[0])
            .expect(200)
            .expect("Content-Type", /application\/json/)

        
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${firstUser._body.userToken}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const newBlogsInDB = await testHelper.blogsInDB()
        expect(newBlogsInDB).toHaveLength(testHelper.initialBlogs.length + 1)
    })

    test("adding a blog fails with code 401 Unauthorized if a token is not provided", async () => {
        const newBlog = {
            title:"Greater things are yet to come",
            author:"Falade Bayo",
            url:"https://greaterfaladedbayo.com",
            likes:12434   
        }        

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' )
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        const newBlogsInDB = await testHelper.blogsInDB()
        expect(newBlogsInDB).toHaveLength(testHelper.initialBlogs.length)
    })


    test("if likes property is missing, return 0 as default value", async () => {
        const newBlog = {
            title:"Greater things are yet to come",
            author:"Falade Bayo",
            url:"https://greaterfaladedbayo.com", 
        }

        const firstUser = await api
            .post('/api/login')
            .send(testHelper.usersLoginDetails[0])
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const newlySavedBlog = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${firstUser._body.userToken}`)
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        
        expect(newlySavedBlog.body.likes).toEqual(0)
    })

    test("return statusCode 400 if data is incomplete", async () => {
        const newBlog = {
            author:"Falade Bayo",
            url:"https://greaterfaladedbayo.com", 
        }
        const firstUser = await api
            .post('/api/login')
            .send(testHelper.usersLoginDetails[0])
            .expect(200)
            .expect("Content-Type", /application\/json/)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${firstUser._body.userToken}`)
            .send(newBlog)
            .expect(400)
            
    })
})

describe('deleting a specific blog', () => {
    test('can delete a specific blog', async () => {
        
        const newBlog = {
            title:"Greater things are yet to come",
            author:"Falade Bayo",
            url:"https://greaterfaladedbayo.com",
            likes:12434   
        }        

        const firstUser = await api
            .post('/api/login')
            .send(testHelper.usersLoginDetails[0])
            .expect(200)
            .expect("Content-Type", /application\/json/)
  
            
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${firstUser._body.userToken}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const noteToDelete = await Blog.findOne({title:"Greater things are yet to come"})             
        
        await api
            .delete(`/api/blogs/${noteToDelete.id}`)
            .set('Authorization', `Bearer ${firstUser._body.userToken}`)
            .expect(204)

        const afterBlogs = await testHelper.blogsInDB();
        const blogTitles = afterBlogs.map(blog => blog.title)

        expect(afterBlogs).toHaveLength(testHelper.initialBlogs.length)
        expect(blogTitles).not.toContain(newBlog.title)
    })
})

describe('modify a specific blog', () => {
    test('can modify a specific blog', async () => {
        const initialBlog =  await testHelper.blogsInDB();
        const noteToUpdate = initialBlog[0]
        const newLikes = {likes:noteToUpdate.likes + 1}
      
        await api
            .put(`/api/blogs/${noteToUpdate.id}`)
            .send(newLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const afterBlogs = await testHelper.blogsInDB();
      
        expect(afterBlogs[0].likes).toEqual(Number(testHelper.initialBlogs[0].likes) + 1)
    })
})


afterAll(async() => {
    await mongoose.connection.close();   
})
