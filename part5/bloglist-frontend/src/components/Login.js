import React from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ message,
  messageType,
  setMessage,
  setMessageType,
  setUser,
  username,
  password,
  setUsername,
  setPassword
}) => {

  // Handling logging in functionality
  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const loggedIn = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(loggedIn)
      )
      blogService.setToken(loggedIn.token)
      setUser(loggedIn)
      setUsername('')
      setPassword('')

    } catch (exception) {

      // Catching failed attempts at login
      setMessage('Wrong username or password')
      setMessageType('failure')

      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>log into application</h2>
        <Notification message={message} messageType={messageType} />
        <div>
            username <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
        </div>
        <div>
            password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='loginSubmit' type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  setMessageType: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm