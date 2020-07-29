import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => (
  <> <td>{text}</td> <td>{value}</td> </>
)
const Statistics  = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if ( all > 0 ) {
    return (
      <div>
        <h1>Statistics </h1>
        <table>
        <tr>  <Statistic text="Good" value ={good} />       </tr>
        <tr>  <Statistic text="Neutral" value ={neutral} /> </tr>
        <tr>  <Statistic text="Bad" value ={bad} />         </tr>
        <tr>  <Statistic text="All" value ={all} />       </tr>
        <tr>  <Statistic text="Average" value ={(good-bad)/all} />       </tr>
        <tr>  <Statistic text="Positive" value ={good/all} /> %</tr>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Statistics </h1>
        No feedback given
      </div>
    )
  }
  
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  return (
    <>
    <h1> Give feedback </h1>
    <Button handleClick={increaseGood} text="Good" />
    <Button handleClick={increaseNeutral} text="Neutral" />
    <Button handleClick={increaseBad} text="Bad" />
    <Statistics  good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)