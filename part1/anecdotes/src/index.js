import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnecOfTheDay = (props) => {
  return (
    <div>
      <h1> Anecdote of the day</h1>
      {props.anecdotes[props.selected]} <br />
  </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostPopularAnec = (props) => {
  let maxIndex = 0
  for (const [i, value] of props.vote.entries()) {
    if (value === props.mostVote) {
      maxIndex = i
      break
    }
  }

  if ( props.mostVote > 0) {
    return (
      <div>
        <h1> Anecdote with the most vote</h1>
        {props.anecdotes[maxIndex]} <br />
        has {props.mostVote} votes
    </div>
    )
  }
  else {
    return ( <></>)
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
  const firstSelect = Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(firstSelect)
  const [vote, setVote] = useState(Array(6).fill(0))
  const [mostVote, setMostVote] = useState(0)
  const setSelectButton = () => {
    let rand = Math.floor(Math.random() * anecdotes.length)
    while ( rand === selected ) {
      rand = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(rand)
  }
  const setVoteButton = () => {
    const copy = [...vote]
    copy[selected]++
    setVote(copy)
    setMostVote(Math.max(...copy))
  }

  return (
    <>
      <AnecOfTheDay anecdotes={anecdotes} selected={selected} />
      <Button handleClick={setVoteButton} text="vote" />
      <Button handleClick={setSelectButton} text="next anecdote" />
      <MostPopularAnec anecdotes={anecdotes} vote={vote} mostVote = {mostVote}/>
    </>

  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)