import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {

  const message = useSelector(state => state.notifications)

  if (message === '') {
    return null
  }

  let messageType = ''
  if (message.includes('Wrong')) {
    messageType = 'error'
  } else {
    messageType = 'success'
  }

  return (
    <Alert severity={messageType}>
      {message}
    </Alert>
  )
}

export default Notification