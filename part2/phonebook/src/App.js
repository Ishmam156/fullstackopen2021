import React, { useState, useEffect } from 'react'
import bookService from './services/entries'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

const Persons = ({ item, persons, setPersons }) => {

  const handleDelete = (id) => {
    // Checking if delete confirmation and then deleting
    if (window.confirm(`Do you want to delete ${item.name} from the phone book?`)) {
      bookService
        .deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  return (
    <>
      <p>{item.name} {item.number} <button onClick={() => handleDelete(item.id)}>delete</button></p>
    </>
  )
}

const Display = ({ title }) => <h2>{title}</h2>

const PersonForm = (props) => {
  // Form to handle submission and name check
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input onChange={props.onChangeName} value={props.nameValue} />
        </div>
        <div>
          number: <input onChange={props.onChangeNumber} value={props.numberValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Filter = (props) => <div>filter shown with <input onChange={props.onSearchChange} value={props.searchValue} /></div>

const App = () => {

  // Declaring states
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [sucessMessage, setSucessMessage] = useState(null)
  const [messageType, setMessageType] = useState('sucess')

  // Handling input changes
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {

    setnewSearch(event.target.value)

    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  // Filtering for search results
  const personToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    let message = null
    let messagetype = null

    // Check if person is already in the phonebook
    if (persons.map(person => person.name).includes(newName)) {
      // Get their current entry
      const updateEntry = persons.find(person => person.name === newName)
      // Checking if user wants to overwrite with new number
      if (window.confirm(`${newName} is already added in the phonebook. Do you want to replace the old number with the new?`)) {
        // Update entry and do a PUT request
        const updatedEntry = { ...updateEntry, number: newNumber }
        bookService
          .updateEntry(updateEntry.id, updatedEntry)
          .then(returnEntry => {
            setPersons(persons.map(person => person.id !== updateEntry.id ? person : returnEntry))
            message = `Updated ${newName}'s phone number.`
            messagetype = 'sucess'
          })
          .catch(error => {
            message = `Information of ${newName} has already been removed from the server.`
            messagetype = 'failure'

            setMessageType(messagetype)
            setSucessMessage(message)
            setNewName('')
            setNewNumber('')
            setTimeout(() => setSucessMessage(null), 5000)

          })
      }
    } else {
      // Add new entry if person not in phonebook
      const newBook = {
        name: newName,
        number: newNumber
      }

      bookService
        .addEntry(newBook)
        .then(returnEntry => {
          setPersons(persons.concat(returnEntry))
        })

      message = `Added ${newName}.`
      messagetype = 'sucess'

    }
    // Reset input field
    setNewName('')
    setNewNumber('')

    if (message !== null) {

      console.log(message)
      console.log(messagetype)

      setMessageType(messagetype)
      setSucessMessage(message)
      setTimeout(() => setSucessMessage(null), 5000)
    }
  }

  // Fetch data from server initially
  useEffect(() => {

    bookService
      .getEntries()
      .then(response =>
        setPersons(response))

  }, [])

  return (
    <div>
      <Display title='Phonebook' />
      <Notification message={sucessMessage} messageType={messageType} />
      <Filter onSearchChange={handleSearchChange} searchValue={newSearch} />
      <Display title='Add a new' />
      <PersonForm onChangeName={handleInputChange} onChangeNumber={handleNumberChange} nameValue={newName} numberValue={newNumber} onSubmit={handleSubmit} />
      <Display title='Numbers' />
      {personToShow.map(person =>
        <Persons key={person.name} item={person} persons={persons} setPersons={setPersons} />
      )}
    </div>
  )
}


export default App