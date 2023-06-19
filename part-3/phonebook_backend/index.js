require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const People =require('./model/people');
const people = require('./model/people');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'))


app.get('/api/persons', (request, response) => {
    People.find({}).then(
        people => response.json(people)
    ) 
})

app.get('/info', (request, response) => {
    People.find({}).then(
        people => {
            const info = `Phonebook has info for ${people.length} people`
            const date = new Date()
            response.send(`<div><div>${info}</div><div>${date}</div></div>`)        
        }
    )   
    
})

app.get('/api/persons/:id', (request, response) => {
    People.findById(request.params.id).then(person => {
        if (person) {response.json(person)}
            else {response.status(404).end()}
        console.log(person)
    })    
})

app.delete('/api/persons/:id',(request, response) => {
    People.findByIdAndDelete(request.params.id).then(person => {
        if(person) {response.status(204).json({status:`person with id ${request.params.id} is deleted`})}
        else {response.status(404).end()}
    })     
    
})


const generateID = () => {
    const maxID = Persons.length > 0
        ? Math.max(...Persons.map(person => person.id))
        : 0
return maxID + 1
}

app.post('/api/persons', (request, response) => { 
    const body = request.body
    if (body.name && body.number){
        People.find({}).then(
            persons => {
                if (persons.find(person => person.number === body.number)){
                    return response.status(400).json({error:"Contact already exist"})
                }
                else {
                    new People(body).save()
                        .then(body => response.status(201).json(body))
                }
            })
    
    }
    else {response.status(404).json({error:`The contact details is incomplete`})}  
})

const unKnownEndPoint = (request, response) => {
    response.status(404).send({error:"unknown endpoint"})
}

app.use(unKnownEndPoint)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})