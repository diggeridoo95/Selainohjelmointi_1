
const express = require('express')
const now = new Date()

const app = express()
app.use(express.json())

const cors = require('cors')

app.use(cors())

let books = [
    {
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "year": "2008",
      "id": "1"
    },
    {
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt and David Thomas",
      "year": "1999",
      "id": "2"
    },
    {
      "title": "You Don't Know JS",
      "author": "Kyle Simpson",
      "year": "2015",
      "id": "3"
    },
    {
      "title": "Eloquent JavaScript",
      "author": "Marijn Haverbeke",
      "year": "2018",
      "id": "4"
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<p>Book list has info for ${books.length} books</p><p>${now}</p>`)
})

app.get('/api/books', (request, response) => {
  response.json(books)
})

app.get('/api/books/:id', (request, response) => {
  const id = request.params.id
  const book = books.find(book => book.id === id)

  if (book) {
    response.json(book)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/books/:id', (request, response) => {
  const id = request.params.id
  books = books.filter(book => book.id !== id)

  response.status(204).end()
})

app.post('/api/books', (request, response) => {
  const body = request.body

  if (!body.title || !body.author || !body.year) {
    return response.status(400).json({
      error: 'title, author or year is missing'
    })
  }

  const newBook = {
    title: body.title,
    author: body.author,
    year: body.year,
    id: String(Math.floor(Math.random() * 1000000))
  }

  books = books.concat(newBook)

  response.json(newBook)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})