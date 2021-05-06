import React, { useRef } from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  // Typography
} from '@material-ui/core'

const BlogList = ({ blogs, user }) => {

  const blogFormRef = useRef()

  const createBlog = () => {
    return(
      <div>
        <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
          <CreateBlog
            blogs={blogs}
            clearForm={blogFormRef} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      {/* <br />
      <Typography variant='h4'>Blogs</Typography> */}
      <br />
      {user && createBlog()}
      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog Title</TableCell>
              <TableCell>Added By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              .sort((a, b) => a.likes - b.likes).reverse()  // Sorting by likes
              .map(blog => {
                return(
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                  </TableRow>
                )}
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList