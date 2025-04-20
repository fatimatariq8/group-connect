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
  const [isCollapsed, setIsCollapsed] = useState(false);
    

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
              <div className="my-group-section mb-4">
                {/* Group Header */}
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    padding: '15px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)} // Toggle dropdown
                >
                  {/* Left: Dropdown Arrow and Group Name */}
                  <div className="d-flex align-items-center">
                    <i
                      className={`bi ${isCollapsed ? 'bi-chevron-down' : 'bi-chevron-right'} me-2`}
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    <span className="text-primary fw-bold" style={{ fontSize: '1.2rem' }}>
                      My Group
                    </span>
                  </div>

                  {/* Center: Number of Members */}
                  <div>
                    <span className="text-muted fw-bold" style={{ fontSize: '1rem' }}>
                      {group.length} {group.length === 1 ? 'student' : 'students'}
                    </span>
                  </div>

                  {/* Right: Leave Group Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={clearGroup}
                    disabled={group.length === 0}
                    style={{
                      width: '120px',
                      // top: '500px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Leave Group
                  </button>
                </div>

                {/* Group Members (Collapsible Section) */}
                {isCollapsed && (
                  <div
                    className="mt-3 px-3 py-2"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      borderTop: '1px solid #ddd',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {group.length > 0 ? (
                      <div className="d-flex flex-wrap">
                        {group.map((student, index) => (
                          <div
                            key={student._id}
                            className="px-3 py-2"
                            style={{
                              minWidth: '150px',
                              borderRadius: '8px',
                              backgroundColor: '#f1f1f1',
                              margin: '5px',
                            }}
                          >
                            <span className="text-dark fw-bold">{`${index + 1}. ${student.name}`}</span>
                            <br />
                            {/* <small className="text-muted">Batch: {student.batch}</small> */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted">No students in the group.</div>
                    )}
                  </div>
                )}
              </div>  


            {/* <h3 className="text-dark mb-3">Create New Group</h3> */}
            <div className="d-flex align-items-center mt-4 mb-3">
              <h3 
                className="fw-bold me-3"
                style={{ color: '#1a1a1a', fontSize: '1.5rem' }} // Proper object syntax
              >
                Create New Group
              </h3>
              <hr 
                className="flex-grow-1 border-dark" 
                style={{ opacity: 0.8, height: '2px', border:'none' }} // Proper object syntax
              />
            </div>

            <div className="group-list list-group mb-4">
              {group.length > 0 ? (
                group.map((student, index) => (
                  <div
                    key={student._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{
                      borderRadius: '8px',
                      marginBottom: '10px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#f8f9fa', // Light background for better contrast
                    }}
                  >
                    {/* Student Name and Batch */}
                    <div>
                      <h6 className="mb-0 text-primary">{`${index + 1}. ${student.name}`}</h6>
                      <small className="text-muted">Batch: {student.batch}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-warning">No students in the group.</div>
              )}
            </div>

            <div className="group-actions d-flex justify-content-between">
              <button
                className="btn btn-success btn-lg me-2"
                onClick={finalizeGroup}
                disabled={group.length === 0}
              >
                Finalize Group
              </button>
              <button
                className="btn btn-danger btn-lg"
                onClick={clearGroup}
                disabled={group.length === 0}
              >
                Clear Group
              </button>
            </div>

              <div 
                className="d-flex justify-content-center align-items-center mt-4 mb-3"
                style={{ position: 'relative' }}
              >
                {/* Heading */}
                <h3 
                  className="fw-bold"
                  style={{ color: '#1a1a1a', fontSize: '1.5rem', marginRight: '10%' }}
                >
                  Available Students
                </h3>

                {/* Divider */}
                <hr 
                  className="flex-grow-1 border-dark"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    border: 'none',
                    opacity: 0.8,
                    height: '2px',
                    width: '100%',
                    zIndex: '-1',
                  }}
                />
              </div>


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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
