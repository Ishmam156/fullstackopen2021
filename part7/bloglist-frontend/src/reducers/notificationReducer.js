const initialState = ''

const reducer = (state=initialState, action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return action.data
  case 'RESET_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const addNotification = ( data ) => {
  return({
    type : 'ADD_NOTIFICATION',
    data
  })
}

export const resetNotification = () => {
  return({
    type : 'RESET_NOTIFICATION'
  })
}

let timeout
export const setNotification = (message, time) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => {
      dispatch(resetNotification())
    }, time)
    await dispatch(addNotification(message))
  }
}

export default reducer