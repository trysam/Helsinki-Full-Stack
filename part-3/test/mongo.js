const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://trysam2003:${password}@cluster0.f8r8rpb.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
  const note = new Note({
  content: 'I need to fast-track the update',
  important: true,
})

  note.save().then(result => {
  console.log('note saved!')
  console.log(result)
  mongoose.connection.close()
})
*/

  Note.find({content: 'I need to fast-track the update'}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
})




