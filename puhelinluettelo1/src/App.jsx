import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)
      })
    }, [])
    console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }


    const personExists = persons.some(p => p.name === newName)

    if (personExists) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    axios
    .post('http://localhost:3001/api/persons', newPerson)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')

    })}

    const deletePerson = (id) => {

      if (!window.confirm('Are you sure you want to delete this person?')) {
        return
      }

      const personToDelete = persons.find(p => p.id === id)
      if (personToDelete) {
        axios
          .delete(`http://localhost:3001/api/persons/${personToDelete.id}`)
          .then(() => {
            setPersons(persons.filter(p => p.id !== personToDelete.id))
          })
          .catch(error => {
            console.error('Error deleting person:', error)
          })
      }
    }
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={event => setNewName(event.target.value)}
          />
          number: <input 
            value={newNumber}
            onChange={event => setNewNumber(event.target.value)}
          />          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => 
        <li key={p.id}>
          {p.name} {p.number}
          <button id="deleteButton" onClick={() => deletePerson(p.id)}>delete</button>

        </li>)} 
        
      </ul>
    </div>
  )
}

export default App