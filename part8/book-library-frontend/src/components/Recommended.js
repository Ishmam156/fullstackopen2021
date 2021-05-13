import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = ({ show, genre }) => {

    const books = useQuery(ALL_BOOKS, {
        variables: { genre: genre ? genre.favoriteGenre : '' },
        pollInterval: 1000
    })

    if (!show) {
        return null
    }

    if (books.data.allBooks.length === 0) {
        return (
            <>
                <div>
                    <h2>recomendations</h2>
                    <div>
                        in genre: <strong>{genre.favoriteGenre}</strong>
                    </div>
                    <p>Currently no books in this genre</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <h2>recomendations</h2>
                <div>
                    in genre: <strong>{genre.favoriteGenre}</strong>
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
            </div>
        </>
    )

}

export default Recommended