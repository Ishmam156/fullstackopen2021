import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  // Get all the blogs initially and set to state
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // Get user if user is in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  // .filter(blog => blog.user.username === user.username) // Filtering for logged in user

  // Render blogs into browser
  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} messageType={messageType} setMessage={setMessage} setMessageType={setMessageType} />
        <p>Logged in as : {user.name}</p>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <br />
        <div>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <CreateBlog
              setBlogs={setBlogs}
              blogs={blogs}
              setMessage={setMessage}
              setMessageType={setMessageType}
              clearForm={blogFormRef} />
          </Togglable>
        </div>
        <br />
        <div id='allBlogs'>
          {blogs
            .sort((a, b) => a.likes - b.likes).reverse()  // Sorting by likes
            .map(blog =>
              <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} updateBlog={blogService.updateBlog} />
            )}
        </div>
      </div>
    )
  }

  return (
    <>
      {user === null ?
        <LoginForm message={message} messageType={messageType} setMessage={setMessage} setMessageType={setMessageType}
          setUser={setUser} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
        :
        blogList()
      }
    </>
  )
}

export default App