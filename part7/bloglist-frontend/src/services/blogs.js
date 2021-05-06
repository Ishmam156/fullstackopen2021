import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const submitBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (id, newBlog) => {

  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data

}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const BlogService = {
  getAll,
  setToken,
  submitBlog,
  updateBlog,
  deleteBlog,
  addComment
}

export default BlogService