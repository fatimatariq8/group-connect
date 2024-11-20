import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav';
import Sidebar from '../components/sidebar';
import CardGrid from '../components/cardgrid';
import CourseAdder from '../components/CourseAdder'; // Import CourseAdder
import '../styles/home.css';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { id } = useParams(); // Retrieve user ID from the URL
  const [user, setUser] = useState(null);
  const [isCourseAdderVisible, setIsCourseAdderVisible] = useState(false); // State to toggle CourseAdder

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error("Failed to fetch user data", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (id) {
      fetchUserData(); // Fetch only if ID is present
    }
  }, [id]);

  // Toggle CourseAdder visibility
  const handleAddCourseToggle = () => {
    setIsCourseAdderVisible(!isCourseAdderVisible);
  };

  // Handle added course (from CourseAdder)
  const handleAddCourse = (course) => {
    console.log('Course Added:', course); // Add logic to save or display the added course
  };

  return (
    <div className="dashboard">
      <Sidebar userId={id} /> {/* Use id directly from useParams */}
      <div className="main-content">
        <Navbar onAddCourseClick={handleAddCourseToggle} /> {/* Pass toggle function */}
        {isCourseAdderVisible && (
          <CourseAdder onAddCourse={handleAddCourse} /> // Conditionally render CourseAdder
        )}
        <CardGrid userId={id} />
      </div>
    </div>
  );
};

export default Dashboard;
