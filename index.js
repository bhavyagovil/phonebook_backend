require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

morgan.token('body', request => JSON.stringify(request.body))

const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(morgan(':method :url :body'))


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(err => {console.log(err)})
}) 

/* app.get('/info', (request, response) => {
    const number = persons.length
    const date = new Date()
    console.log(date)
    response.send(
        `<p>Phonebook has info for ${number} people </p> <p> ${date} </p>`)
})  */

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    } 
  
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Service on ${PORT}`)
})

/* app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(person => person.name)

    if ((body.name === undefined) || (body.number === undefined)) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
      }

    for (let i = 0; i < persons.length +1; i++) {
       if (body.name === names[i]) {
        return response.status(400).json({
            error: 'person already exists'
        })
       }
      }

    const person = {
      /* id: String(Math.floor(Math.random() * (Math.floor(50) - Math.ceil(1)) + Math.ceil(1))), 
      name: body.name,
      number: body.number
      
    }
  
   person.save().then(savedPerson => {response.json(savedPerson)})
   
  }) */