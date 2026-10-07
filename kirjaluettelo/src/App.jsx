import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [books, setBooks] = useState([]) // Sovelluksen kirjaluettelo.
  const [newTitle, setNewTitle] = useState('') // Lomakkeen controlled input -arvot.
  const [newAuthor, setNewAuthor] = useState('')
  const [newYear, setNewYear] = useState('')

  useEffect(() => { // Hakee kirjat backendiltä komponentin ensimmäisen renderöinnin jälkeen.
    console.log('effect')
    axios
      .get('http://localhost:3001/api/books')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setBooks(response.data)
      })
    }, []) // Tyhjä riippuvuuslista estää effectin toistumisen jokaisella renderöinnillä.
    console.log('render', books.length, 'books')

  const addBook = (event) => {
    event.preventDefault() // Estää selainta lataamasta sivua lomakkeen lähetyksen jälkeen.
    const newBook = { // Muodostaa palvelimelle lähetettävän uuden kirjan.
      title: newTitle,
      author: newAuthor,
      year: newYear
    }


    const bookExists = books.some(b => b.title === newTitle) // Tarkistaa, ettei sama nimi ole jo listalla.

    if (bookExists) {
      alert(`${newTitle} is already in the book list`)
      return
    }

    axios // Tallentaa uuden kirjan backendille.
    .post('http://localhost:3001/api/books', newBook)
    .then(response => {
      console.log(response)
      setBooks(books.concat(response.data)) // concat luo uuden taulukon lisäämällä palvelimen palauttaman kirjan.
      setNewTitle('')
      setNewAuthor('')
      setNewYear('')

    })}

    const deleteBook = (id) => {

      if (!window.confirm('Are you sure you want to delete this book?')) {
        return
      }

      const bookToDelete = books.find(b => b.id === id) // find etsii poistettavan kirjan id:n perusteella.
      if (bookToDelete) {
        axios
          .delete(`http://localhost:3001/api/books/${bookToDelete.id}`)
          .then(() => {
            setBooks(books.filter(b => b.id !== bookToDelete.id)) // filter luo uuden listan ilman poistettua kirjaa.
          })
          .catch(error => {
            console.error('Error deleting book:', error)
          })
      }
    }
  
  

  return (
    <div>
      <h2>Book list</h2>
      <form onSubmit={addBook}>
        <div>
          title: <input 
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)} // event.target.value on käyttäjän kirjoittama uusi arvo.
          />
          author: <input 
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)} // Päivittää author-kentän staten inputin arvolla.
          />
          year: <input 
            value={newYear}
            onChange={event => setNewYear(event.target.value)} // Päivittää year-kentän staten inputin arvolla.
          />          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Books</h2>
      <ul>
        {books.map(b => // Renderöi jokaisen kirjan omaksi listaelementikseen.
        <li key={b.id}>
          {b.title} {b.author} {b.year}
          <button id="deleteButton" onClick={() => deleteBook(b.id)}>delete</button>

        </li>)} 
        
      </ul>
    </div>
  )
}

export default App