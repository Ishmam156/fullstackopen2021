import React, { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommended from './components/Recommended'

import { GET_CURRENT_USER, BOOK_ADDED, ALL_BOOKS } from './queries'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 5000,
  })

  const user = useQuery(GET_CURRENT_USER, {
    pollInterval: 1000,
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  if (user.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <>
          <button onClick={() => setPage('add book')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={() => handleLogout()}>log out</button>
        </>}

      </div>

      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        setErrorMessage={setErrorMessage}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add book'}
        setPage={setPage}
        updateCacheWith={updateCacheWith}
        setErrorMessage={setErrorMessage}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setErrorMessage={setErrorMessage}
      />

      <Recommended
        show={page === 'recommended'}
        genre={user.data.me}
      />

    </div>
  )
}

export default App