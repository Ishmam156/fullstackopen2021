import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.map(user => {
    return({
      username: user.username,
      id : user.id
    })
  })
}

const User = {
  getAll
}

export default User