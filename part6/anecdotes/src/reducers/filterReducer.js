const initialFilter = ''

const reducer = ( state=initialFilter, action ) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch (action.type) {
        case 'INPUT':
            return action.data
        case 'RESET_INPUT':
            return initialFilter
        default:
            return state
    }
}

export const addMessage = (message) => {
    return({
        type: 'INPUT',
        data: message
    })
}

export default reducer