import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import StudentDetail from '../components/studentdetail';
import '../styles/coursepage.css';

const CoursePage = () => {
  const { id } = useParams(); // Retrieve userId from URL

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
  }, []);

  return (
    <div className="course-page">
      <Sidebar userId={id} /> {/* Pass userId to Sidebar */}
      <div className="main-content">
        <div className="course-content">
          <h2>User Course Page</h2>
          <p>{`User ID: ${id}`}</p> {/* Display User ID */}
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
