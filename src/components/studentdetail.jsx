// StudentDetail.jsx
import React from 'react';
import '../styles/studentdetail.css'; // CSS for styling

const StudentDetail = ({ name, section, role }) => {
  return (
    <div className="student-detail">
      <div className="student-avatar">
        <img
          src="https://via.placeholder.com/40" // Placeholder image
          alt={`${name}'s avatar`}
          className="avatar"
        />
      </div>
      <div className="student-info">
        <span className="student-name">{name}</span>
        <span className="student-section">{section}</span>
        <span className="student-role">{role}</span>
      </div>
    </div>
  );
};

export default StudentDetail;
