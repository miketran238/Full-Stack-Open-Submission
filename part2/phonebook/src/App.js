import React, { useState, useEffect } from 'react'
import personService from './services/personsService'
import './App.css'

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
const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
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
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')

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
        setNotification(
          `${returnedPerson.name} is successfully added`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
        setNotification(
          `${changedPerson.name} 's number is successfully changed`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(() => {
        setErrorMessage(
          `${changedPerson.name} 's information has been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        personService.getAll().then(initialNotes => {setPersons(initialNotes)})
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
        setNotification(
          `'${person.name}' is successfully deleted`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }
      )})
      
    }
}
  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(person => person.name.includes(nameFilter))


  return (
    <div>
      <DisplayPhoneBook nameFilter={nameFilter} handleNewFilter={handleNewFilter} />
      <br />
      {errorMessage ? <Error message={errorMessage} /> : <></> }
      {notification ? <Notification message={notification} /> : <></> }
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