import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/coursepage.css';

const CoursePage = () => {
  const { id, courseId } = useParams(); // Retrieve courseId from URL

  const [availableStudents, setAvailableStudents] = useState([]);
  const [createGroup, setCreateGroup] = useState([]); // New group section
  const [myGroup, setMyGroup] = useState([]); // My group section
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFinalizeDisabled, setIsFinalizeDisabled] = useState(false); // Control finalize button

  // Fetch students and group details
  useEffect(() => {
    const fetchStudentsAndGroup = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students.');
        }
        const studentData = await response.json();
        setAvailableStudents(studentData.availableStudents || []);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsAndGroup();
  }, [courseId]);

  // Add a student to the create group
  const addToGroup = (student) => {
    if (!createGroup.some((s) => s._id === student._id)) {
      setCreateGroup([...createGroup, student]);
      setAvailableStudents(availableStudents.filter((s) => s._id !== student._id));
    }
  };

  // Finalize group
  const finalizeGroup = () => {
    setMyGroup([...createGroup]); // Move students to "My Group"
    setCreateGroup([]); // Clear "Create New Group"
    setIsFinalizeDisabled(true); // Disable Finalize button
  };

  // Clear create group
  const clearGroup = () => {
    setAvailableStudents([...availableStudents, ...createGroup]); // Move back to available
    setCreateGroup([]); // Clear "Create New Group"
  };

  // Leave group
  const leaveGroup = () => {
    setAvailableStudents([...availableStudents, ...myGroup]); // Move back to available
    setMyGroup([]); // Clear "My Group"
    setIsFinalizeDisabled(false); // Re-enable Finalize button
  };

  return (
    <div className="course-page">
      <Sidebar userId={id} /> {/* Pass courseId to Sidebar */}
      <div className="main-content">
        <div className="course-content">
          {loading ? (
            <p>Loading students...</p>
          ) : (
            <>
              {/* My Group Section */}
              <div className="my-group-section mb-4">
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
                  <div className="d-flex align-items-center">
                    <i
                      className={`bi ${isCollapsed ? 'bi-chevron-down' : 'bi-chevron-right'} me-2`}
                      style={{ fontSize: '1.5rem' }}
                    ></i>
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: '1.4rem', // Slightly larger size
                        color: '#2c3e50', // Darker font color
                        // fontFamily: 'Arial, sans-serif', // Optional: Add a clean font
                        // textTransform: 'uppercase', // Optional: Make text uppercase
                        // letterSpacing: '0.05em', // Optional: Add slight spacing between letters
                      }}
                    >
                      My Group
                    </span>

                  </div>
                  <div>
                    <span className="text-muted fw-bold" style={{ fontSize: '1rem' }}>
                      {myGroup.length} {myGroup.length === 1 ? 'student' : 'students'}
                    </span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={leaveGroup}
                    disabled={!isFinalizeDisabled}
                    style={{
                      width: '120px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Leave Group
                  </button>
                </div>
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
                    {myGroup.length > 0 ? (
                      myGroup.map((student, index) => (
                        <div key={student._id} style={{ margin: '5px 0' }}>
                          {`${index + 1}. ${student.name} - Batch: ${student.batch}`}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted">No students in the group.</div>
                    )}
                  </div>
                )}
              </div>

              {/* Create New Group Section */}
              <div className="d-flex align-items-center mt-4 mb-3">
                <h3 className="fw-bold me-3" style={{ color: '#1a1a1a', fontSize: '1.5rem' }}>
                  Create New Group
                </h3>
                <hr
                  className="flex-grow-1 border-dark"
                  style={{ opacity: 0.8, height: '2px', border: 'none' }}
                />
              </div>

              <div className="group-list list-group mb-4">
                {createGroup.length > 0 ? (
                  createGroup.map((student, index) => (
                    <div
                      key={student._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{
                        borderRadius: '8px',
                        marginBottom: '10px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f8f9fa',
                      }}
                    >
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
                  disabled={createGroup.length === 0 || isFinalizeDisabled}
                >
                  Finalize Group
                </button>
                <button
                  className="btn btn-danger btn-lg"
                  onClick={clearGroup}
                  disabled={createGroup.length === 0}
                >
                  Clear Group
                </button>
              </div>

              {/* Available Students Section */}
              <div className="student-list">
                <h3 className="fw-bold mt-4 mb-3">Available Students</h3>
                <div className="list-group">
                  {availableStudents.map((student) => (
                    <div
                      key={student._id}
                      className="list-group-item d-flex align-items-center justify-content-between"
                      style={{
                        borderRadius: '8px',
                        marginBottom: '10px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f8f9fa',
                      }}
                    >
                      <div>
                        <h6 className="fw-bolder">{student.name}</h6>
                        <small className="fw-normal">Batch: {student.batch}</small>
                      </div>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
