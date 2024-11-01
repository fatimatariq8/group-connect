import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// import '../styles/cardgrid.css';

const courses = [
  { id: 'web-mobile-dev', title: 'Web and Mobile Development-L1', color: 'green', label: 'Term: Fall Semester 2024' },
  { id: 'nlp', title: 'Natural Language Processing-L1', color: 'red', label: 'Term: Fall Semester 2024' },
  { id: 'deep-learning', title: 'Intro to Deep Learning-L2', color: 'darkblue', label: 'Term: Fall Semester 2024' },
  { id: 'graph-data-science', title: 'Graph Data Science-L1', color: 'purple', label: 'Term: Fall Semester 2024' },
];

const CardGrid = () => {
  return (
    <div className="card-grid">
      {courses.map((course) => (
         <Link to="/coursepage">
          <Card style={{ backgroundColor: course.color, color: 'white', marginBottom: '20px' }}>
            <CardContent className="text">
              <Typography className="text_title" variant="h5">{course.title}</Typography>
              <Typography variant="body2">{course.label}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;
