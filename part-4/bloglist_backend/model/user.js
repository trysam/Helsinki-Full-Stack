const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        required: true,
        unique: true,
    },
    
    name: String,
    
    passwordHash: {
        type: String,        
    },
    
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],

    note: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]

})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v,
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)