import React, { useState } from 'react';
import '../styles/profile.css'; 
import Sidebar from '../components/sidebar';
import { useNavigate } from 'react-router-dom'; // Add navigation like in Login

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    id: '',
    email: '',
    batch: '',
    major: '',
    gpa: '',
  });

  const navigate = useNavigate(); // For navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Saved', profile);
    // After successful form submission, you can navigate to another page
    navigate('/dashboard'); // Example of navigating to dashboard after saving
  };

  return (
    <div className="profile-page">
      <div className="profile_side">
        <Sidebar />
      </div>
      <div className="content">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-header">
            <div className="profile-image">
              <img 
                src="profile.png" 
                alt="User Profile" 
              />
              <button className="edit-image-button">Change Image</button>
            </div>
            <div className="profile-actions">
              <button type="submit" className="save-button">Save</button>
            </div>
          </div>
          
          <div className="profile-section">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="profile-section">
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={profile.id}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="batch">Batch:</label>
              <select id="batch" required>
              <option value="">Select</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              {/* Add more batch options */}
            </select>
            </div>
          </div>

          <div className="profile-section">
            <div className="form-group">
              <label htmlFor="major">Major:</label>
              <select id="major" required>
                <option value="">Select</option>
                <option value="computer_science">Computer Science</option>
                <option value="electrical_engineering">Electrical Engineering</option>
                <option value="computer_engineering">Computer Engineering</option>
                <option value="sdp">Social and Development Policy</option>
                <option value="cnd">Communication and Design</option>
                <option value="ch">Comparative Humanities</option>
              {/* Add more options as per your need */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gpa">GPA:</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={profile.gpa}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
