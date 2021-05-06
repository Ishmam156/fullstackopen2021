import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useHistory } from 'react-router'
import { useField } from '../hooks/index'
import {
  TextField,
  Button,
} from '@material-ui/core'

const LoginForm = () => {

  const [username, setUsername] = useField('text', 'username')
  const [password, setPassword] = useField('password', 'password')

  const history = useHistory()
  const dispatch = useDispatch()

  // Handling logging in functionality
  const handleLogin =  async (event) => {
    event.preventDefault()

    await dispatch(loginUser({
      username: username.value,
      password: password.value
    }))
    setUsername()
    setPassword()

    if (window.localStorage.getItem('loggedBlogUser')) {
      history.push('/')
    }
  }

  return (
    <>
      <br />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id='username'
            label='username'
            { ...username }
          />
          <br />
        </div>
        <div>
          <TextField
            id='password'
            label='password'
            { ...password }
          />
        </div>
        <br />
        <Button variant="contained" color="primary" id='loginSubmit' type="submit">login</Button>
      </form>
    </>
  )
}

export default LoginForm