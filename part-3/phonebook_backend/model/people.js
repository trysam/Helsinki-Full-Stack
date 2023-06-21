const mongoose = require("mongoose");

url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength: [3, '{VALUE} is below the expected minimum name characters']
    },
    number: {
        type:String,
        validate:{
            validator: v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v),
           message: props => `${props.value} is not a valid phone number!`,
            require: [true, 'User phone number required']
        }
    }
}) 

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model("Person", personSchema)
