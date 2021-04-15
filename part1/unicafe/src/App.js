import React, { useState } from 'react'

const Display = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ values: [good, neutral, bad] }) => {

  // Calculating overall stats
  let all = good + neutral + bad
  let avg = ((good * 1) + (bad * -1)) / all
  let positive = ((good / all) * 100) + ' %'

  // Check if any input has been provided
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  else {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Stats</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={all} />
            <Statistic text='average' value={avg} />
            <Statistic text='positive' value={positive} />
          </tbody>
        </table>
      </>
    )
  }
}

const Statistic = ({ text, value }) => {

  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )

}

const App = () => {

  // Defining initial states

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Display text='Give Feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Display text='Statistics' />
      <Statistics values={[good, neutral, bad]} />
    </>
  )
}

export default App