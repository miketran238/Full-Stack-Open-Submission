import React, { useState } from 'react'
import Person from './components/Person'

const DisplayPhoneBook =({nameFilter, handleNewFilter}) => {
  return (
    <>
    <h1>Phonebook</h1>
    <div>
      Filter by name 
      <input value={nameFilter} onChange={handleNewFilter} />
    </div>
    </>
  )
}

const AddNewPerson = (props) => {
  return (
    <>
      <h2> Add New </h2>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNewName}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )

}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isExist = persons.find(person => person.name === newName)
    console.log(isExist)
    if ( isExist === undefined ) {
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      
    }
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(person => person.name.includes(nameFilter))


  return (
    <div>
      <DisplayPhoneBook nameFilter={nameFilter} handleNewFilter={handleNewFilter} />
      <AddNewPerson addPerson={addPerson} newName={newName} newNumber={newNumber}
                    handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      
      <h2>Numbers</h2>
      {personsToShow.map((person,i) => 
        <Person key={i} person={person} />
        )}
    </div>
  )
}

export default App