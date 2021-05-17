import React from 'react'

interface ContentProps {
    name: string;
    exerciseCount: number;
}

interface ArrayContent {
course: ContentProps[]
}

const Total = ({ course }: ArrayContent) => {
    return (
        <>
        <p>
        Number of exercises {" "}
        {course.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
        </>
    )
}

export default Total