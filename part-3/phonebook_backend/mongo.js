const mongoose = require('mongoose')

if (process.argv.length<3){
  console.log('input mongoDB password as the third argument variable')
}

const password = process.argv[2]

const url = `mongodb+srv://trysam2003:${password}@cluster0.f8r8rpb.mongodb.net/phonebookApp`

mongoose.set('strictQuery',false)

// Define a Mongoose schema for your documents
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create a Mongoose model based on the schema
const Person = mongoose.model('Person', personSchema)



// Connect to MongoDB using Mongoose
mongoose.connect(url)
  .then(() => {

    Person.find({}).then(persons => {
      persons.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })       
    // Use insertMany to batch load the documents
    /*
    const person = new Person({
        name:`${process.argv[3]}`,
        number:`${process.argv[4]}`
    })

    person.save().then(response => {
        console.log(`{name:${process.argv[3]} number:${process.argv[4]} is added}`)
        mongoose.connection.close()
    })
    
    Person.insertMany(contacts.Persons)
      .then(() => {
        console.log('Documents inserted successfully');
        // Close the database connection
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error inserting documents:', error);
        // Close the database connection
        mongoose.connection.close();
      });
     */ 
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
