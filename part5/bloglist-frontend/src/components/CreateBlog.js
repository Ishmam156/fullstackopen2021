import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateBlog = ({ setBlogs, blogs, setMessage, setMessageType, clearForm }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // Handle submission of front end blog entry
  const handeSubmit = async (event) => {
    event.preventDefault()

    const submmitedBlog = await blogService.submitBlog({ title, author, url })
    const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))

    // Add user information to blog list
    submmitedBlog.user = {
      id: submmitedBlog.user,
      name: currentUser.name,
      username: currentUser.username
    }

    setBlogs(blogs.concat(submmitedBlog))
    // Change visibility using other component
    clearForm.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage(`a new blog ${submmitedBlog.title} by ${submmitedBlog.author} added!`)
    setMessageType('success')

    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)

  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handeSubmit} >
        <div>
          title  <input value={title} id='title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input value={author} id='author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url <input value={url} id='url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <br />
        <button id='blogSubmit' type="submit">save</button>
      </form>
    </>
  )
}

CreateBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setMessage: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
  clearForm: PropTypes.object.isRequired,
}

export default CreateBlog