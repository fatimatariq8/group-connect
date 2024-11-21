import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav';
import Sidebar from '../components/sidebar';
import CardGrid from '../components/cardgrid';
import '../styles/home.css';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { id } = useParams(); // Retrieve user ID from the URL
  const [enrolledCourses, setEnrolledCourses] = useState([]); // State for enrolled courses
  const [allCourses, setAllCourses] = useState([]); // State for all available courses

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/courses`);
      if (!response.ok) {
        throw new Error('Failed to fetch enrolled courses');
      }
      const data = await response.json();
      setEnrolledCourses(data); // Update enrolled courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch all available courses
  const fetchAllCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setAllCourses(data.courses || []); // Assuming courses are in `data.courses`
    } catch (error) {
      console.error('Error fetching all courses:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEnrolledCourses();
      fetchAllCourses();
    }
  }, [id]);

  // Handle adding a course
  const handleAddCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/enroll/${id}/${courseId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        alert('Course added successfully!');
        fetchEnrolledCourses(); // Re-fetch enrolled courses
      } else {
        console.error('Failed to add course:', data.error);
        alert(data.message || 'Failed to add course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar userId={id} /> {/* Sidebar with user ID */}
      <div className="main-content">
        <Navbar
          userId={id}
          courses={allCourses} // Pass all courses to Navbar
          onAddCourse={handleAddCourse} // Pass the add course handler
        />
        <CardGrid userId={id} courses={enrolledCourses} /> {/* Pass enrolled courses */}
      </div>
    </div>
  );
};

export default Dashboard;
