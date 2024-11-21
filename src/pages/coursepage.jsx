import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/coursepage.css';

const CoursePage = () => {
  const { id, courseId } = useParams(); // Retrieve courseId from URL

  const [availableStudents, setAvailableStudents] = useState([]);
  const [unavailableStudents, setUnavailableStudents] = useState([]);
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students and group details
  useEffect(() => {
    const fetchStudentsAndGroup = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students.');
        }

        const groupResponse = await fetch(`http://localhost:5000/api/groups/${courseId}`);
        const studentData = await response.json();
        const groupData = await groupResponse.ok ? await groupResponse.json() : { students: [] };

        // Separate available and unavailable students
        const groupStudentIds = groupData.students.map((s) => s._id);
        setAvailableStudents(
          studentData.availableStudents.filter((s) => !groupStudentIds.includes(s._id))
        );
        setUnavailableStudents([
          ...studentData.unavailableStudents,
          ...studentData.availableStudents.filter((s) => groupStudentIds.includes(s._id)),
        ]);
        setGroup(groupData.students);
      } catch (error) {
        console.error('Error fetching students or group:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsAndGroup();
  }, [courseId]);

  // Add a student to the group
  const addToGroup = async (student) => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, studentId: student._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add student to group.');
      }

      setGroup([...group, student]); // Update group locally
      setAvailableStudents(availableStudents.filter((s) => s._id !== student._id));
      setUnavailableStudents([...unavailableStudents, student]); // Move student to unavailable
    } catch (error) {
      console.error('Error adding student to group:', error);
    }
  };

  // Clear the group
  const clearGroup = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear group.');
      }

      setAvailableStudents([...availableStudents, ...group]); // Move group members back to available
      setUnavailableStudents(unavailableStudents.filter((s) => !group.find((g) => g._id === s._id)));
      setGroup([]); // Clear the group
    } catch (error) {
      console.error('Error clearing group:', error);
    }
  };

  // Finalize group action (placeholder)
  const finalizeGroup = () => {
    alert('Group finalized!');
  };

  function formatMajor(major) {
    return major
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/[^a-zA-Z\s]/g, '') // Remove any special characters
      .toLowerCase() // Convert to lowercase
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  }
  

  return (
    <div className="course-page">
      <Sidebar userId={id} /> {/* Pass courseId to Sidebar */}
      <div className="main-content">
        <div className="course-content">
          {/* <h2>Course Project</h2> */}
          {loading ? (
            <p>Loading students...</p>
          ) : (
            <>
              {/* <h3>Available Students:</h3> */}
              <div class="d-flex align-items-center mt-4 mb-3">
                <h3 class="text-primary fw-bold me-3">Available Students</h3>
                <hr 
                    className="flex-grow-1 border-primary" 
                    style={{ opacity: 0.7, height: '2px' }} 
                />

              </div>
                {/* <div className="student-list">
                {availableStudents.length > 0 ? (
                  availableStudents.map((student) => (
                    <div key={student._id} className="student-detail">
                      <span>{student.name}</span>
                      <span>Batch: {student.batch}</span>
                      <button onClick={() => addToGroup(student)}>Add to Group</button>
                    </div>
                  ))
                ) : (
                  <p>No available students.</p>
                )}
              </div> */}
              <div className="student-list">
  {availableStudents.length > 0 ? (
    <div className="list-group">
      {availableStudents.map((student) => (
        <div
          key={student._id}
          className="list-group-item d-flex align-items-center justify-content-between"
          style={{
            borderRadius: '8px',
            marginBottom: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f8f9fa', // Optional soft background
          }}
        >
          {/* Student Details */}
          <div className="d-flex align-items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="Student Avatar"
              className="rounded-circle me-3"
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <h6 className="fw-bolder">{student.name}</h6>
              <small className="fw-normal">Batch: {student.batch}</small>
              <br />
              <small className="fw-normal"> Major: {formatMajor(student.major)}</small>
              <br />
              <small className="fw-normal">GPA: {student.gpa}</small>
            </div>
          </div>
          {/* Add Button */}
          <button
              className="btn btn-primary btn-sm rounded-circle"
              onClick={() => addToGroup(student)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'purple',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none'
              }}
              aria-label="Add to Group"
            >
              +
          </button>

        </div>
      ))}
    </div>
  ) : (
    <div className="alert alert-warning">No available students.</div>
  )}
</div>


              <h3>Unavailable Students:</h3>
              <div className="student-list">
                {unavailableStudents.length > 0 ? (
                  unavailableStudents.map((student) => (
                    <div key={student._id} className="student-detail">
                      <span>{student.name}</span>
                      <span>Batch: {student.batch}</span>
                      <span>N/A</span>
                    </div>
                  ))
                ) : (
                  <p>No unavailable students.</p>
                )}
              </div>

              <h3>Current Group:</h3>
              <div className="group-list">
                {group.length > 0 ? (
                  group.map((student, index) => (
                    <div key={student._id} className="group-member">
                      <span>{`${index + 1}. ${student.name}`}</span>
                      <span>Batch: {student.batch}</span>
                    </div>
                  ))
                ) : (
                  <p>No students in the group.</p>
                )}
              </div>

              <div className="group-actions">
                <button onClick={finalizeGroup} disabled={group.length === 0}>
                  Finalize Group
                </button>
                <button onClick={clearGroup} disabled={group.length === 0}>
                  Clear Group
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
