import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'


const User = ({ userBlogs, allUser }) => {
  const user = allUser.find(user => user.id === userBlogs.id)

  if (!userBlogs || !user) {
    return null
  }


  return(
    <>
      <br />
      <Typography variant='h4'>User: {user.username}</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title of blog</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userBlogs.blogs.map(blog => {
              return(
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default User