import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'

import LoginForm from './components/Loginform'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import BlogList from './components/BlogList'

import { initBlogs } from './reducers/blogReducer'
import { getAllUsers } from './reducers/allUserReducer'
import { checkInUser, checkOutUser } from './reducers/userReducer'

import {
  Container,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'

const App = () => {

  // Hooks declaration
  const dispatch = useDispatch()
  const history = useHistory()

  // Get all the blogs initially from redux store and set to state
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  // Get all the users initially from redux store and set to state
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])


  // Get user if user is in local storage
  useEffect(() => {
    dispatch(checkInUser())
  }, [])

  // Handle logout
  const handleLogout = () => {
    dispatch(checkOutUser())
    history.push('/')
  }

  // Storing initial blogs to variable
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const allUser = useSelector(state => state.allUser)

  const matchUser = useRouteMatch('/users/:id')
  const userBlogs = matchUser
    ? { blogs : blogs.filter(blog => blog.user.id === matchUser.params.id), id : matchUser.params.id }
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const singleBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
                blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
                users
            </Button>
            {user
              ? <><em>{user.name} logged in</em><Button color="inherit" onClick={handleLogout}>Logout</Button></>
              : <Button color="inherit" component={Link} to="/login">
          login
              </Button>
            }
          </Toolbar>
        </AppBar>

        <Notification />

        <Switch>
          <Route path="/users/:id">
            <User userBlogs={userBlogs} allUser={allUser} />
          </Route>
          <Route path="/blogs/:id">
            <SingleBlog blog={singleBlog} />
          </Route>
          <Route path="/users">
            <Users blogs={blogs} allUser={allUser} />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/">
            <BlogList blogs={blogs} user={user} />
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App