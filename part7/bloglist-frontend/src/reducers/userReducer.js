import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const reducer = (state=initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'SET_USER':
    return action.data
  case 'LOGOUT_USER':
    return initialState
  default:
    return state
  }
}

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const loggedIn = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedIn))
      blogService.setToken(loggedIn.token)
      dispatch({
        type: 'LOGIN',
        data: loggedIn
      })
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 3000))
    }
  }
}

export const checkInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      blogService.setToken(data.token)
      dispatch({
        type: 'SET_USER',
        data
      })
    }
  }}

export const checkOutUser = ( data ) => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch({
      type: 'LOGOUT_USER',
      data
    })
  }
}


export default reducer