import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CardGrid = ({ userId, courses }) => {
  const [courseColors, setCourseColors] = useState({}); // State to store colors for each course

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = ['blue', 'green', 'orange', 'darkred', 'teal', 'indigo', 'darkbrown', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Assign random colors to courses on initial render or when new courses are added
  useEffect(() => {
    const newColors = { ...courseColors };
    courses.forEach((course) => {
      if (!newColors[course._id]) {
        newColors[course._id] = getRandomColor(); // Assign a random color only once
      }
    });
    setCourseColors(newColors); // Update state with new colors
  }, [courses]);

  if (!courses || courses.length === 0) {
    return <p>No enrolled courses yet. Add some!</p>;
  }

  return (
    <div className="card-grid">
      {courses.map((course) => (
        <Link key={course._id} to={`/coursepage/${userId}/${course._id}`}>
          <Card
            style={{
              backgroundColor: courseColors[course._id], // Use the assigned color
              color: 'white',
              marginBottom: '20px',
            }}
          >
            <CardContent>
              <Typography variant="h5">{course.title}</Typography>
              <Typography variant="body2">{course.term}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;
