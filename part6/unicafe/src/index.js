import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const updatedState = store.getState()

  return (
    <div>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>neutral</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      <div>good {updatedState.good}</div>
      <div>neutral {updatedState.ok}</div>
      <div>bad {updatedState.bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)