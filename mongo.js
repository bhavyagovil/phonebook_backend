const mongoose = require('mongoose')

const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]

const url = `mongodb+srv://bhavya0836govil:${password}@cluster0.izsjxoz.mongodb.net/persons?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const printAll = () => {
    Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })}


/* if (process.argv.length<4) {
  console.log('phonebook:')
  printAll()
  process.exit(1)
} */


if (!inputName && !inputNumber) {
    printAll()
  } else {
    const person = new Person({
      name: inputName,
      number: inputNumber,
    })
  
    person.save().then(result => {
      console.log(`added ${inputName} number ${inputNumber} to phonebook`)
      mongoose.connection.close()
    })
  }

/* 
const person = new Person({
  name: inputName,
  number: inputNumber,
}) 

person.save().then(result => {
  console.log( `added ${inputName} number ${inputNumber} to phonebook`)
  mongoose.connection.close()
})
 */