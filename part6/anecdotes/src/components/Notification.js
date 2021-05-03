import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // const message = useSelector(state => state.notification)
  const message = props.notification

  if (message) {
    return (
      <div style={style}>
        {message}
      </div>
    )
  } else {
    return null
  }

}

const mapStateToProps = (state) => {
  return { notification : state.notification}
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

// export default Notification
export default ConnectedNotification