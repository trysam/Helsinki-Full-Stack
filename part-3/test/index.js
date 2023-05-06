const express = require('express');
const cors = require('cors')
const morgan = require('morgan')

morgan.token('body', function (req, res) {return JSON.stringify(req.body)})

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    },

    {
        id: 4,
        content: "Hello, I just added this",
        important: false
    },
  ]


app.get('/', (request, response) => {
    response.send('<h1>Welcome World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note){
        response.json(note)
    } else{
        response.status(404).json({
            error: "Note is deleted or not yet added "
        })
    }
})

app.delete('/api/notes/:id',(request,response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
})

app.put('/api/notes/:id',(request,response) => {
    const id = Number(request.params.id);
    const updatedNote = request.body
    notes = notes.map(note => note.id === id ? updatedNote : note);

    response.json(updatedNote);
})

const generateID = () => {
    const maxID = notes.length > 0 
    ? Math.max(...notes.map(note => note.id)) 
    : 0;
    return maxID + 1;
}

app.post('/api/notes', (request, response) => {
    const body = request.body      
    
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id : generateID()
    }

    notes = notes.concat(note)

    response.json(note)    
})

const PORT = process.env.PORT || 3001;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})





