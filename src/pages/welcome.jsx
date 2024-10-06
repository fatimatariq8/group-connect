import React from 'react';
import '../styles/welcome.css';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate('/login');
  };
    return (
        <div className="container">
          <div className="puzzle">
            <img
              src="logo.png"
              alt="Puzzle Icon"
              className="puzzleIcon"
            />
            {/* <h1 className="title">
              Group<span className="connect">Connect</span>
            </h1> */}
          
          <p className="subtitle">
            GroupConnect is a student-friendly app that helps Habib University
            students find the perfect group partners for class projects based on
            availability, skills, and preferences, ensuring smoother collaboration
            and successful teamwork.
          </p>
          </div>
          <div className='ready1'>
          <h2 className="ready">Ready?</h2>
          <button className="getStartedBtn" onClick={goToDashboard}>Get Started ➔</button>
          </div>
          <div className="universityLogo">
            <img
              src="uni_logo.png"
              alt="Habib University Logo"
              className="universityLogoImage"
            />
          </div>
        </div>
      );
}

export default WelcomePage;
