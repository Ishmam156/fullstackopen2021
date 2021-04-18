import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
    return (
        <p><strong>total of {course.parts.reduce((a, b) => a + b.exercises, 0)} exercises</strong></p>
    )
}

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(courses =>
                <Part key={courses.id} part={courses} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}

export default Course