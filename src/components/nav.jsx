import React, { useState } from 'react';
import '../styles/nav.css';

const Navbar = ({ userId, courses, onAddCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddCourse = () => {
    if (!selectedCourse) {
      alert('Please select a course.');
      return;
    }

    // Call the add course handler passed from Dashboard
    onAddCourse(selectedCourse);
    setSelectedCourse(''); // Reset selected course
    setIsPopupVisible(false); // Close popup
  };

  return (
    <div className="navbar">
      <h1>Dashboard</h1>
      <div className="crsbtn">
        <button className="addcourse" onClick={() => setIsPopupVisible(true)}>
          Add a Course +
        </button>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Select a Course</h2>
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            <div className="popup-actions">
              <button onClick={handleAddCourse}>Add Course</button>
              <button onClick={() => setIsPopupVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
