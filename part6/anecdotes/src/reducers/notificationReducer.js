const initialMessage = ''

const reducer = ( state=initialMessage, action ) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch (action.type) {
        case 'ADD_MESSAGE':
            return action.data
        case 'RESET_MESSAGE':
            return initialMessage
        default:
            return state
    }
}

export const addMessage = (message) => {
    return({
        type: 'ADD_MESSAGE',
        data: message
    })
}

export const resetMessage = () => {
    return({
        type: 'RESET_MESSAGE'
    })
}


let timeout
export const setNotification = (message, time) => {
    return async dispatch => {
        // console.log('Timeout is', timeout)
        if (timeout) {
            // console.log('Clearing timeout')
            clearTimeout(timeout)
            timeout = null
          }
          timeout = setTimeout(() => {
              dispatch(resetMessage())
          }, time)
        await dispatch(addMessage(message))
    }
}

export default reducer