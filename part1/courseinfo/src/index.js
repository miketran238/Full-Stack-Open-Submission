import React from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part =(props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part name={props.parts[0]} exercise={props.exercises[0]} />
    <Part name={props.parts[1]} exercise={props.exercises[1]} />
    <Part name={props.parts[2]} exercise={props.exercises[2]} />
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
    <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]
  return (
    <>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />

    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))