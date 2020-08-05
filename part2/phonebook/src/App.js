import React, { useState, useEffect } from 'react'
import personService from './services/personsService'

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
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const existPerson = persons.find(person => person.name === newName)
    // console.log(isExist)
    if ( existPerson === undefined ) {
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    }
    else {
      let answer = window.confirm(`${newName} is already added to phonebook, replace old number with new number?`)
      if ( answer ) {
        const changedPerson = {...existPerson, number: newNumber}
        personService.update(existPerson.id, changedPerson)
      .then(returnedNote => {
        setPersons(persons.map(note => note.id !== existPerson.id ? note : returnedNote))
        setNewName('')
        setNewNumber('')
      })

      }
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

  const deleteHandler = (person) => {
    let answer = window.confirm(`Delete ${person.name} ?`)
    if ( answer ) {
        personService.deletePerson(person.id).then(() => {
        personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })})
      
    }
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
        <p key={i}>{person.name} {person.number} <button onClick={() => deleteHandler(person)}> Delete </button></p>
        )}
    </div>
  )
}

export default App