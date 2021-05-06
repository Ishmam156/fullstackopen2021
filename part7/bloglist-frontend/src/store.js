import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUserReducer from './reducers/allUserReducer'

const reducer = (combineReducers(
  {
    'notifications' : notificationReducer,
    'blogs' : blogReducer,
    'user' : userReducer,
    'allUser' : allUserReducer
  }
))

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store