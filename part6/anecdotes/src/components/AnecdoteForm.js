import React from 'react'
import { addEntry } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ( props ) => {
  
  // const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.entry.value
    event.target.entry.value = ''

    // dispatch(addEntry(content))
    // dispatch(setNotification(`New entry of '${content}'`, 2000))
    props.addEntry(content)
    props.setNotification(`New entry of '${content}'`, 2000)
  }
    
  return(
      <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit} >
            <div>
                <input name='entry' />
            </div>
          <button>create</button>
        </form>
      </>        
  )
}

const mapDispatchToProps = {
  addEntry,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm

// export default AnecdoteForm