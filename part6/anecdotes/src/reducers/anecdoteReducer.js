import anecService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const toChange = state.find(item => item.id === action.data.id)
      const changedItem = { ...toChange, votes : toChange.votes + 1 }
      return state.map(item => item.id !== toChange.id ? item : changedItem)
    case 'ADD':
      const toAdd = action.data
      return [ ...state, toAdd]
    case 'INIT_ANEC':
      return action.data
    default:
      return state
  }
}

export const initAnec = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data : anecdotes
    })
  } 
}

export const updateVote = (id) => {
  return async dispatch => {
    await anecService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data : { id }
    })
  }
}

export const addEntry = (content) => { 
  return async dispatch => {
    const newNote = await anecService.addEntry(asObject(content))
    dispatch({
      type: 'ADD',
      data : newNote
    })
  }
}
  

export default reducer