require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const People =require('./model/people');


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'))


app.get('/api/persons', (request, response, next) => {
    People.find({}).then(
        people => response.json(people)
    ).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    People.find({}).then(
        people => {
            const info = `Phonebook has info for ${people.length} people`
            const date = new Date()
            response.send(`<div><div>${info}</div><div>${date}</div></div>`)        
        }
    ).catch(error => next(error))   
    
})

app.get('/api/persons/:id', (request, response, next) => {
    People.findById(request.params.id).then(person => {
        if (person) {response.json(person)}
            else {response.status(404).end()}
        console.log(person)
    }).catch(error => next(error))   
})

app.delete('/api/persons/:id',(request, response, next) => {
    People.findByIdAndDelete(request.params.id).then(person => {
        if(person) {response.status(204).json({status:`person with id ${request.params.id} is deleted`})}
        else {response.status(404).end()}
    }).catch(error => next(error))     
    
})

app.post('/api/persons', (request, response, next) => { 
    const body = request.body
    if (body.name && body.number){
        People.find({}).then(
            persons => {
                if (persons.find(person => person.number === body.number)){
                    return response.status(400).json({error:"Contact already exist"})
                }
                else {
                    new People(body).save()
                        .then(body => response.status(201).json(body)).catch(error => next(error))
                }
            }).catch(error => next(error))
    
    }
    else {response.status(404).json({error:`The contact details is incomplete`})}  
})

app.put("/api/persons/:id",(request, response, next) => {
    const {name, number} = request.body;


    People.findByIdAndUpdate(request.params.id, {name, number}, {new:true}).then(
        person => response.status(201).json(person)
    ).catch(error => next(error))
})


//handles route not found
const unKnownEndPoint = (request, response) => {
    response.status(404).send({error:"unknown endpoint"})
}

app.use(unKnownEndPoint)

//handles error returned by DB server
const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === "CastError"){
        return response.status(400).send({error:"mal-formatted ID"})
    }
    else if (error.name === "ValidationError"){
        return response.status(400).json({error:error.message})
    }
    next(error)
};

app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})