import React from 'react'
const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    // const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    const exercises = course.parts.map( part => part.exercises )
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = exercises.reduce(reducer)
    // 1 + 2 + 3 + 4
    console.log(sum);
    return(
        <h3> Total of {sum} exercises</h3>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map( part => 
            <Part part={part} />)}
      </div>
    )
  }

const Course = ({course}) => {
    return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
    )
}

export default Course;