import React from 'react'
import { addMessage } from '../reducers/filterReducer'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Filter = ( props ) => {

  // const dispatch = useDispatch()

  const handleChange = (event) => {
    let message = event.target.value
    // dispatch(addMessage(message))
    props.addMessage(message)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  addMessage
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter

// export default Filter