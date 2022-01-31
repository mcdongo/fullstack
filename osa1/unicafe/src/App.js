import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)


  return (
    <div>
      <Feedback/>
      <Button handleClicked={handleGood} text='good'/>
      <Button handleClicked={handleNeutral} text='neutral'/>
      <Button handleClicked={handleBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({ handleClicked, text}) => (
  <button onClick={ handleClicked }>
    {text}
  </button>
)

const Feedback = () => (<h1>give feedback</h1>)
const Statistics = ( {good, neutral, bad}) => {

  const total = Sum(good, neutral, bad)
  const average = Average(good, neutral, bad)
  if (total === 0) {
    return (
    <div>
      <h1>statistics</h1>
      <h2>No feedback given</h2>
    </div>)
  }
  return (
    <div>
      <h1>
        statistics
      </h1>
      <table>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={total}/>
      <StatisticLine text="average" value={average}/>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function Sum(a,b,c) {
  return a+b+c
}

function Average(a,b,c) {
  const total = Sum(a,b,c)
  let value = a-c
  return value/total
}

export default App