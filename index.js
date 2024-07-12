const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
}) 

app.get('/info', (request, response) => {
    const number = persons.length
    const date = new Date()
    console.log(date)
    response.send(
        `<p>Phonebook has info for ${number} people </p> <p> ${date} </p>`)
}) 

app.get('/api/persons/:id', (request, response) => {
    const id  = (request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
}
)

app.delete('/api/persons/:id', (request, response) => {
    const id  = (request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = {
      id: String(Math.floor(Math.random() * (Math.floor(50) - Math.ceil(1)) + Math.ceil(1))),
      name: body.name,
      number: body.number
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)