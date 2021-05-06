import blogService from '../services/blogs'
const initialState = []

const reducer = (state=initialState, action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'ADD':
    return state.concat(action.data)
  // case 'ADD_COMMENT':
  //   return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'UPDATE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const addBlogs = (data) => {
  return async dispatch => {
    const submmitedBlog = await blogService.submitBlog(data)
    const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    // Add user information to blog list
    submmitedBlog.user = {
      id: submmitedBlog.user,
      name : currentUser.name ,
      username : currentUser.username
    }
    dispatch({
      type: 'ADD',
      data : submmitedBlog
    })
  }
}

export const updateBlog = (id, data, userInfo) => {
  return async dispatch => {
    const changedBlog = await blogService.updateBlog(id, data)
    changedBlog.user = {
      id: userInfo.id,
      name : userInfo.name ,
      username : userInfo.username
    }

    console.log(changedBlog)

    dispatch({
      type: 'UPDATE',
      data : changedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data : id
    })
  }
}

export const addComment = (id, comment, userInfo) => {
  return async dispatch => {
    const data = await blogService.addComment(id, comment)
    data.user = {
      id: userInfo.id,
      name : userInfo.name ,
      username : userInfo.username
    }
    dispatch({
      type: 'UPDATE',
      data
    })
  }
}

export default reducer