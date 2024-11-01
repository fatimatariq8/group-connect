import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from '../components/nav';
import Sidebar from '../components/sidebar';
import StudentDetail from '../components/studentdetail';
import '../styles/coursepage.css';

const CoursePage = () => {
  const { courseId } = useParams(); // Retrieve courseId from URL

  // Sample student data
  const sampleStudents = [
    { name: 'Fatima Tariq', section: 'Capstone (Kaavish) I-C4', role: 'Student' },
    { name: 'John Doe', section: 'Capstone (Kaavish) I-C4', role: 'Student' },
    { name: 'Sarah Ahmed', section: 'Capstone (Kaavish) I-C4', role: 'Student' },
  ];

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching with sample data
    setLoading(true);
    setTimeout(() => {
      setStudents(sampleStudents);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, [courseId]);

  return (
    <div className="course-page">
      <Sidebar /> {/* Sidebar for navigation */}
      <div className="main-content">
        {/* <Navbar /> Navbar at the top */}
        <div className="course-content">
          <h2>{courseId ? `Course: ${courseId}` : 'Course Students'}</h2> {/* Dynamic course name */}
          {loading ? (
            <p>Loading...</p> // Loading indicator
          ) : (
            <div className="student-list">
              {students.map((student, index) => (
                <StudentDetail
                  key={index}
                  name={student.name}
                  section={student.section}
                  role={student.role}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
