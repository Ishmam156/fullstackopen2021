import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
    course: CoursePart[]
}

const Content = ({ course }: ContentProps) => {

  return (
    <>
      <Part course={course} />
    </>
  );
};

export default Content;