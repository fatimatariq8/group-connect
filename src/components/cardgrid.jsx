import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CardGrid = ({ userId, courses }) => {
  if (!courses || courses.length === 0) {
    return <p>No enrolled courses yet. Add some!</p>;
  }

  return (
    <div className="card-grid">
      {courses.map((course) => (
        <Link key={course._id} to={`/coursepage/${userId}/${course._id}`}>
          <Card style={{ backgroundColor: 'purple', color: 'white', marginBottom: '20px' }}>
            <CardContent className="text">
              <Typography className="text_title" variant="h5">{course.title}</Typography>
              <Typography variant="body2">{course.term}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;
