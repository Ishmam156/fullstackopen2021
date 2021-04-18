import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getEntries = () => {
    const allEntries = axios.get(baseUrl)
    return allEntries.then(response => response.data)
}

const addEntry = newEntry => {
    const addedEntry = axios.post(baseUrl, newEntry)
    return addedEntry.then(response => response.data)
}

const deleteEntry = entryID => {
    const deletedEntry = axios.delete(`${baseUrl}/${entryID}`)
    return deletedEntry.then(response => response)
}

const updateEntry = (entryID, newEntry) => {
    const updatedEntry = axios.put(`${baseUrl}/${entryID}`, newEntry)
    return updatedEntry.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getEntries, addEntry, deleteEntry, updateEntry }