import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const courses = [
  { title: 'Web and Mobile Development-L1', color: 'green', label: 'Term: Fall Semester 2024'},
  { title: 'Natural Language Processing-L1', color: 'red', label: 'Term: Fall Semester 2024'},
  { title: 'Intro to Deep Learning-L2', color: 'pink', label: 'Term: Fall Semester 2024'},
  { title: 'Graph Data Science-L1', color: 'purple', label: 'Term: Fall Semester 2024'},
];

const CardGrid = () => {
  return (
    <div className="card-grid">
      {courses.map((course, index) => (
          <Card style={{ backgroundColor: course.color, color: 'white' }}>
            <CardContent className='text'>
              <Typography variant="h5">{course.title}</Typography>
              <Typography variant="body2">{course.label}</Typography>
            </CardContent>
          </Card>
      ))}
    </div>
  );
};

export default CardGrid;
