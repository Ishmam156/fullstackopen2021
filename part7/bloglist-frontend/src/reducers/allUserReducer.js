import userService from '../services/users'

const initialState = []

const reducer = (state=initialState, action) => {
  switch (action.type) {
  case 'INITIAL_USERS':
    return action.data
  default:
    return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    // console.log('axios')
    // console.log(data)
    dispatch({
      type: 'INITIAL_USERS',
      data
    })
  }
}

export default reducer