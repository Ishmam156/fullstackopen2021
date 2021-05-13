import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState('all genres')
  const [possibleGenres, setPossibleGenres] = useState([])

  const books = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 1000
  })

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const genreSelection = () => {

    books.data.allBooks.map(book => {
      return book.genres.map(genre => {
        if (!(possibleGenres.includes(genre))) {
          setPossibleGenres(possibleGenres.concat(genre))
        }
        return null
      })
    })

    possibleGenres.sort()

    if (!(possibleGenres.includes('all genres'))) {
      setPossibleGenres(possibleGenres.concat('all genres'))
    }

    return (
      <>
        {possibleGenres.map(genre => <button key={genre} onClick={() => setGenre(genre)} >{genre}</button>)}
      </>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre: <strong>{genre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genreSelection()}
    </div>
  )
}

export default Books