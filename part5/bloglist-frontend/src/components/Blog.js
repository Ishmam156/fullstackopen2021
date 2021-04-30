import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, updateBlog }) => {

  const [visible, setVisible] = useState(false)

  const Blogstyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display : visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const handleLike = async () => {
    // Creating newBlog ready for update
    let newBlog = { ...blog }
    newBlog.user = blog.user.id
    newBlog.likes += 1
    delete newBlog.id

    // Updating blog
    const updatedBlog = await updateBlog(blog.id, newBlog)

    // Add user information to new updated blog
    updatedBlog.user = {
      id: blog.user.id,
      name : blog.user.name ,
      username : blog.user.username
    }

    // Updating state of blogs with new change
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))

  }

  // Get logged in user to enable delete button
  let loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogUser'))

  if (!loggedUserJSON) {
    loggedUserJSON = { username : '' }
  }

  // Handle delete of blog
  const handleDelete = async () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)

      setBlogs(blogs.filter(newblog => newblog.id !== blog.id))
    }
  }

  return(
    <div style={Blogstyle}>
      <i>Blog Title:</i> {blog.title} - <i>written by:</i> {blog.author}
      <button id='viewButton' onClick={ toggleVisibility }>{visible ? 'hide' : 'view'}</button>
      <div style={showDetails} className='hiddenDefault'>
        <div>{blog.url}</div>
        <div className='likeInfo'>Likes: { blog.likes } <button id='likeButton' onClick={ handleLike }>like</button></div>
        <div>{blog.user.name}</div>
        { blog.user.username === loggedUserJSON.username && <div><button id='deleteBlog' onClick={ handleDelete }>remove</button></div> }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog