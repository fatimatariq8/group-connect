import React, { useState, useEffect } from 'react';
import '../styles/nav.css'; 

const Navbar = ({ onAddCourse }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const fetchCourses = async () => {
      try {
          let allCourses = [];
          let currentPage = 1;
          let totalPages = 1;
  
          do {
              const response = await fetch(`http://localhost:5000/api/courses?page=${currentPage}`);
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              allCourses = [...allCourses, ...data.courses];
              totalPages = data.totalPages;
              currentPage++;
          } while (currentPage <= totalPages);
  
          setCourses(allCourses); // Store all courses in state
      } catch (error) {
          console.error('Failed to fetch courses:', error);
      }
  };
  

    const handleTogglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
        if (!isPopupVisible) {
            fetchCourses();
        }
    };

    const handleAddCourse = () => {
        const course = courses.find(course => course._id === selectedCourse);
        if (course) {
            onAddCourse(course);
            setSelectedCourse('');
            setIsPopupVisible(false);
        }
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedCourse('');
    };

    return (
        <div className="navbar">
            <h1>Dashboard</h1>
            <div className="crsbtn">
                <button className="addcourse" onClick={handleTogglePopup}>
                    Add a Course +
                </button>
            </div>

            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Select a Course</h2>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                        <div className="popup-actions">
                            <button onClick={handleAddCourse}>Add Course</button>
                            <button onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
