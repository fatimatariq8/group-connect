import React, { useState } from 'react';
import '../styles/profile.css';

const Profile = () => {
  // Initial state for profile fields
  const [profile, setProfile] = useState({
    username: 'fatima124',
    major: 'Computer Science',
    batch: 'CS 2025',
    email: 'fatima124@st.habib.edu.pk',
  });

  // State for tracking editable mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handler to update profile fields
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for "Save" button
  const handleSave = () => {
    setIsEditing(false);
    // You can add a function here to save the updated data to a database or API
  };

  // Handler for "Reset" button
  const handleReset = () => {
    setProfile({
      username: 'fatima124',
      major: 'Computer Science',
      batch: 'CS 2025',
      email: 'fatima124@st.habib.edu.pk',
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="back-button">🔙 Back</div>
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Avatar"
          className="profile-avatar"
        />
        <h2>{profile.username.toUpperCase()}</h2>
        <p>{profile.batch}</p>

        <div className="profile-details">
          {/* Editable Inputs */}
          <div className="detail-row">
            <label>User Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.username}</span>
            )}
          </div>

          <div className="detail-row">
            <label>Major:</label>
            {isEditing ? (
              <input
                type="text"
                name="major"
                value={profile.major}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.major}</span>
            )}
          </div>

          <div className="detail-row">
            <label>Batch:</label>
            {isEditing ? (
              <input
                type="text"
                name="batch"
                value={profile.batch}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.batch}</span>
            )}
          </div>

          <div className="detail-row">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="reset-btn" onClick={handleReset}>
                  Reset
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
