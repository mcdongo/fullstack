import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSort, setSortBy] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (personInList()) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (newSort === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
    setSortBy(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(newSort))

  function personInList() {
    const found = persons.find(element => element.name === newName)
    if (found) {
      return true
    } else {
      return false
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSort={newSort} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <AddNew newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <ShowPersons personsToShow={personsToShow} />
    </div>
  )

}

const Person = ({ person }) => {
  return (
    <div>
      { person.name } { person.number }
    </div>
  )
}

const Filter = ({newSort, handleFilterChange}) => {
  return (
    <form>
      <div>
        filter shown with <input value={newSort} onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const AddNew = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <div>

        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ShowPersons = ({personsToShow}) => {
  return (

    <div>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App