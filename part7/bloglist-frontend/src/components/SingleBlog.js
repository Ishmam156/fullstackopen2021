import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField
} from '@material-ui/core'

const SingleBlog = ({ blog }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [comment, setComment] = useField('text', 'comment')

  if (!blog) {
    return (
      <>
        <h3>Invalid Blog id.</h3>
      </>
    )
  }

  const userInfo = {
    id: blog.user.id,
    name : blog.user.name ,
    username : blog.user.username
  }

  const handleLike = async () => {
    // Creating newBlog ready for update
    let newBlog = { ...blog }
    newBlog.user = blog.user.id
    newBlog.likes += 1
    delete newBlog.id

    // Updating blog
    dispatch(updateBlog(blog.id, newBlog, userInfo))
  }

  // Get logged in user to enable delete button
  let loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogUser'))

  if (!loggedUserJSON) {
    loggedUserJSON = { username : '' }
  }

  // Handle delete of blog
  const handleDelete = async () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      history.push('/')
    }
  }

  const uniqueID = () => Math.floor(Math.random() * 100000)

  const handleComment = ( event ) => {
    event.preventDefault()
    dispatch(addComment(blog.id, { comments : comment.value }, userInfo))
    setComment()
  }

  return(
    <>
      <br />
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {blog.title}
          </Typography>
          <Typography color="textSecondary" component="h2">
          added by: {blog.user.name}
          </Typography>
          <br />
          <Typography variant="h6">
            {blog.likes} likes <Button onClick={handleLike} variant="contained" color="primary" size="small">Like</Button>
          </Typography>
          <br />
          <Typography variant="h6" component="h5">
          Comments
          </Typography>
          <ul>
            {blog.comments.map(comment => <Typography key={uniqueID()} color="textSecondary" component="h2"><li>{comment}</li></Typography>)}
          </ul>
        </CardContent>
        <CardActions>
          <form onSubmit={handleComment}>
            <TextField label='add comment' { ...comment } />
            <Button type='submit' variant="contained" color="primary" size="small">Add</Button>
            <br />
            <br />
            { blog.user.username === loggedUserJSON.username && <div><Button size="small" id='deleteBlog' variant="contained" color="secondary" onClick={ handleDelete }>Delete Blog</Button></div> }
          </form>
        </CardActions>
      </Card>
    </>
  )
}

export default SingleBlog