import React from 'react'
import { countBy } from 'lodash'
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

const Users = ({ blogs, allUser }) => {

  // All username with count of blogs
  const allBlogs = countBy(blogs, (blog) => blog.user.username)

  const collectionBlogs = JSON.parse(JSON.stringify(allUser))

  // Populate with correct count
  collectionBlogs.forEach((user) => {
    if (user.username in allBlogs){
      user.count = allBlogs[user.username]
    } else {
      user.count = 0
    }
  })

  return(
    <>
      {/* <br />
      <Typography variant='h4'>Users</Typography> */}
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collectionBlogs.map(user => {
              return(
                <TableRow key={user.id}>
                  <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                  <TableCell>{user.count}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )

}

export default Users