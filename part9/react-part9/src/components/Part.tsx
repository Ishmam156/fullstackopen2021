import React from 'react'
import { CoursePart } from '../types';

interface ContentProps {
    course: CoursePart[]
}

const Part = ({ course }: ContentProps) => {

    const check = (part: CoursePart) => {
        switch (part.type) {
            case "normal":
                return (
                    <div key={part.name}>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <div>
                            <em>{part.description}</em>
                        </div>
                        <br />
                    </div>
                )
            case "submission":
                return (
                    <div key={part.name}>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <div>
                            <em>{part.description}</em>
                        </div>
                        <div>
                            submission to {part.exerciseSubmissionLink}
                        </div>
                        <br />
                    </div>
                )
            case "groupProject":
                return (
                    <div key={part.name}>
                        <strong>{part.name} {part.exerciseCount}</strong>
                    <div>project exercises: {part.groupProjectCount}</div>
                    <br />
                    </div>
                )
            case "special":
                return (
                    <div key={part.name}>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <div>
                            <em>{part.description}</em>
                        </div>
                        <div>
                            required skills: {part.requirements.join(", ")}
                        </div>
                        <br />
                    </div>
                )
            default:
                break;
    }} 

    return (
        <>
        {course.map(part => check(part))}
        </>
    )
}

export default Part;