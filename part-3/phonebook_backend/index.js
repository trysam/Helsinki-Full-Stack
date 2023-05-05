const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'))

let Persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(Persons)
})

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${Persons.length} people`
    const date = new Date()

    response.send(`<div><div>${info}</div><div>${date}</div></div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    response.json(Persons.find(person => person.id === id))
})

app.delete('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    Persons = Persons.filter(person => person.id !== id)

    response.status(204).json({status:`person with id ${id} is deleted`})
})


const generateID = () => {
    const maxID = Persons.length > 0
        ? Math.max(...Persons.map(person => person.id))
        : 0
return maxID + 1
}

app.post('/api/persons', (request, response) => { 
    const body = request.body

    const person = body.name && body.number   
    ?{
        id: generateID(),
        name: body.name,
        number: body.number        
    }
    : null
    

    if (Persons.find(person =>person.number === body.number)){
        return response.status(405).json({error:"Contact already exist"})
    }          
    
    if(person) {
        Persons = Persons.concat(person)
        response.status(201).json(person)
    } else return response.status(405).json({error:"Incomplete contact details"})
    
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})