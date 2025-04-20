import React, { useState, useEffect } from 'react';
import '../styles/profile.css'; 
import Sidebar from '../components/sidebar';
import { useNavigate, useParams } from 'react-router-dom'; 
import defaultProfilePic from '../assets/profile.png';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    batch: '',
    major: '',
    gpa: '',
  });
  const [profileImage, setProfileImage] = useState(defaultProfilePic); // Profile image state
  const [selectedFile, setSelectedFile] = useState(null); // File selected by user

  const navigate = useNavigate();
  const { id , courseid} = useParams();

  useEffect(() => {
    // Fetch user profile data when the component loads
    const fetchProfile = async () => {
      if (!id) {
        console.error("User ID is undefined");
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          if (data.profileImage) {
            setProfileImage(`http://localhost:5000/${data.profileImage}`);
          }
        } else {
          const errorText = await response.text();
          console.error("Error fetching profile data:", errorText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file)); // Display selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('batch', profile.batch);
      formData.append('major', profile.major);
      formData.append('gpa', profile.gpa);
      if (selectedFile) formData.append('profileImage', selectedFile); // Include image if available

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Profile updated:', data);
        navigate(`/home/${id}`);
      } else {
        console.error('Error updating profile:', data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Profile deleted successfully.");
          navigate('/'); // Redirect to the home page or another appropriate page after deletion
        } else {
          const data = await response.json();
          console.error("Error deleting profile:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="profile_side">
        <Sidebar userId={id} />
      </div>
      <div className="content">
        <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="profile-header">
            <div className="profile-image">
              <img src={profileImage} alt="User Profile" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="file-input"
                style={{ display: 'none' }} 
                id="profileImageInput"
              />
              <button 
                type="button" 
                className="edit-image-button"
                onClick={() => document.getElementById('profileImageInput').click()}
              >
                Change Image
              </button>
            </div>
            <div className="profile-actions d-flex justify-content-between mt-4">
  <button type="submit" className="btn btn-success btn-lg w-50 me-3">
    Save 
  </button>
  <button type="button" className="btn btn-danger btn-lg w-50" onClick={handleDelete}>
    Delete
  </button>
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
              <label htmlFor="batch">Batch:</label>
              <select 
                id="batch" 
                name="batch" 
                value={profile.batch} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Select</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="major">Major:</label>
              <select 
                id="major" 
                name="major" 
                value={profile.major} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Select</option>
                <option value="computer_science">Computer Science</option>
                <option value="electrical_engineering">Electrical Engineering</option>
                <option value="computer_engineering">Computer Engineering</option>
                <option value="sdp">Social and Development Policy</option>
                <option value="cnd">Communication and Design</option>
                <option value="ch">Comparative Humanities</option>
              </select>
            </div>
          </div>

          <div className="profile-section">
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
