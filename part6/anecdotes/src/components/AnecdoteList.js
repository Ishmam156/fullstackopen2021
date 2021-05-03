import React from 'react'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ( props ) => {
  
  // const dispatch = useDispatch()
  
  // const anecdotes = useSelector(({ filter, anecdote }) => {
  //   if (filter) {
  //     return anecdote.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
  //   } else {
  //     return anecdote
  //   }
  // })

  // const vote = (id, content) => {
  //   dispatch(updateVote(id))
  //   dispatch(setNotification(`you voted '${content}'`, 2000))
  // }

  const vote = (id, content) => {
    props.updateVote(id)
    props.setNotification(`you voted '${content}'`, 5000)
  }

  return(
      <>
        {props.anecdotes
        .sort(( a, b ) => a.votes - b.votes).reverse()
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
      )}
      </>        
  )
}

const mapStateToProps = (state) => {
  if ( state.filter ) {
    return {
      anecdotes: state.anecdote.filter(item => item.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  } else {
    return {
      anecdotes : state.anecdote
    }
  }
}

// const anecdotes = useSelector(({ filter, anecdote }) => {
//   if (filter) {
//     return anecdote.filter(item => item.content.toLowerCase().includes(filter.toLowerCase()))
//   } else {
//     return anecdote
//   }
// })

const mapDispatchToProps = {
  updateVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList

// export default AnecdoteList