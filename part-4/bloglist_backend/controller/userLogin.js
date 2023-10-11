const loginRouter = require('express').Router();
const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
    const { username , password } = request.body;

    const user = await User.findOne({username})

    const passwordCorrect = user === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({error: 'Invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const userToken = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 3600})

    response.status(200).send({userToken, username:user.username, name:user.name})

})

loginRouter.get('/', (request, response) => {
    response.send('<h2>login api is available</h2>')
})

module.exports = loginRouter;