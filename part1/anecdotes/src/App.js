import React, { useState } from 'react'

const Display = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Vote = ({ handleClick, votes }) => {
  return (
    <>
      has {votes} vote(s).
      <br />
      <button onClick={handleClick}>Vote</button>
    </>
  )
}

const MostVotes = (props) => {

  // Getting the max value and index of it - taken from SO
  const max = Math.max.apply(Math, props.votes.map((i) => i));
  const maxIndex = props.votes.indexOf(max);

  // Checking if any vote has been cast
  if (max === 0) {
    return (
      <>
        Currently no votes have been casted.
      </>
    )
  }
  else {
    return (
      <>
        {props.anecdotes[maxIndex]}
        <br />
        has {max} vote(s).
      </>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  // Function for generating random number to use for indexing
  const generate_random = (max) => {

    // Getting a new random value
    let new_value = Math.floor(Math.random() * max)

    // Loop to check whether new value is different than current
    do {
      new_value = Math.floor(Math.random() * max)
    }
    while (new_value === selected)

    // Update value
    setSelected(new_value)
  }

  // Functiong for adding vote to an anecdote
  const add_vote = (value) => {
    // Copying array and adding vote
    const new_votes = [...votes]
    new_votes[value] += 1

    setVotes(new_votes)
  }

  return (
    <>
      <Display text='Anecdote of the Day' />
      {anecdotes[selected]}
      <br />
      <Vote handleClick={() => add_vote(selected)} votes={votes[selected]} />
      <Button handleClick={() => generate_random(anecdotes.length)} text='Next Anecdote' />
      <br />
      <Display text='Anecdote with the most votes' />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App