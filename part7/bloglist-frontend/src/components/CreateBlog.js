import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlogs } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import {
  TextField,
  Button,
  Typography
} from '@material-ui/core'

const CreateBlog = ({ clearForm }) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useField('text', 'title')
  const [author, setAuthor] = useField('text', 'author')
  const [url, setUrl] = useField('text', 'url')

  // Handle submission of front end blog entry
  const handeSubmit = async (event) => {
    event.preventDefault()

    // Sent to reducer for adding blogs
    dispatch(addBlogs({
      title: title.value,
      author: author.value,
      url : url.value
    }))

    // Change visibility using other component
    clearForm.current.toggleVisibility()
    setTitle()
    setAuthor()
    setUrl()

    dispatch(setNotification(`a new blog ${title.value} by ${author.value} added!`, 3000))

  }

  return(
    <>
      <Typography variant='h6'>Create a new blog</Typography>
      <form onSubmit={handeSubmit} >
        <div>
          <TextField label='title' { ...title } />
        </div>
        <div>
          <TextField label='author' { ...author } />
        </div>
        <div>
          <TextField label='url' { ...url } />
        </div>
        <br />
        <Button variant="contained" color="primary" id='blogSubmit' type="submit">Save</Button>
      </form>
      <br />
    </>
  )
}

export default CreateBlog