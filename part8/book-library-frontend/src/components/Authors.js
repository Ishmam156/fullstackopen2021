import React, { useState } from 'react'
import Select from 'react-select';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTH } from '../queries'

const Authors = (props) => {

  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setErrorMessage(error.graphQLErrors[0].message)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
    }
  })

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const updateBirth = () => {

    const handleSubmit = (event) => {
      event.preventDefault()

      let setBornTo = parseInt(year)

      editAuthor({ variables: { name: selectedOption.value, setBornTo } })

      setYear('')
    }

    const optionAuthors = () => authors.data.allAuthors.map(author => {
      return ({ value: author.name, label: author.name })
    })

    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={optionAuthors()}
          />
          <div>
            Born <input value={year} onChange={({ target }) => setYear(target.value)} />
          </div>
          <div>
            <button>Update Author</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {updateBirth()}
    </div>
  )
}

export default Authors
