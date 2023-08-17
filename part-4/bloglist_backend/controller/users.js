const bcrypt = require('bcrypt');
const User = require('../model/user')
const userRouter = require('express').Router();

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (!password){
        return response.status(400).json({error: 'password is required'})
    } if (password.length < 3) {
        return response.status(400).json({error: 'password length cannot be less than 3'})
    }    
    
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = new User({
        name,
        username,
        passwordHash,
    })

    const savedUser = await user.save();

    response.status(201).json(savedUser);

})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title:1, author:1, url:1, likes:1 }).populate('note')
    response.json(users)
})

module.exports = userRouter;