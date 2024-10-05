import React from "react";
import "../styles/createaccount.css"; // Importing the updated CSS for the account creation page
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent form submission if needed

        // Perform any sign-up logic here

        // After successful sign-up, navigate to the dashboard
        navigate('/home');
    };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h2>Create new Account</h2>
        <p>Already Registered? <a href="/login">Login</a></p>
        
        <form onSubmit={handleSignUp}>
          {/* Name */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          
          {/* University Email */}
          <div className="input-group">
            <label htmlFor="email">Habib University Email</label>
            <input type="email" id="email" placeholder="Enter your university email" required />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>

          {/* Major */}
          <div className="input-group">
            <label htmlFor="major">Major</label>
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

          {/* Batch */}
          <div className="input-group">
            <label htmlFor="batch">Batch</label>
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

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
