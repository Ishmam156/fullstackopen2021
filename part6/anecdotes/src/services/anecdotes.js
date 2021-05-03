import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const addEntry = async (content) => {
    const response = await axios.post(baseURL, content)
    return response.data
}

const updateVote = async (id) => {
    const currentState = await axios.get(`${baseURL}/${id}`)
    const newState = { ...currentState.data , votes : currentState.data.votes + 1}
    const response = await axios.put(`${baseURL}/${id}`, newState)
    return response.data
}

const anecService = {
    getAll,
    addEntry,
    updateVote
}

export default anecService