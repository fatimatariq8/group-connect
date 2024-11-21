import React from 'react';
import '../styles/help.css'; 
import Sidebar from '../components/sidebar';
import { useParams } from 'react-router-dom';

const Help = () => {
  const { id, courseid } = useParams(); // Retrieve the user ID from the URL

  return (
    <div className="help-page">
      <div className="help_side">
        <Sidebar userId={id} /> {/* Pass user ID to Sidebar */}
      </div>
      <div className="help-content">
        <h1 id='text1'>About Us</h1>
        <p id='text2'>
          Welcome to GroupConnect! We are a student-friendly platform designed to help
          Habib University students find the perfect group partners for class projects 
          based on availability, skills, and preferences.
        </p>
        <p id='text2'>
          Our goal is to streamline collaboration and ensure smooth teamwork, so students can
          focus on achieving the best results. We believe in the power of collective effort and
          are here to help you form the most effective study groups!
        </p>
        
        <h2 id='text1'>Contact Us</h2>
        <p id='text2'>
          If you have any questions, feedback, or need assistance, please feel free to reach out 
          to us. We are here to help you!
        </p>
        <ul>
          <li>Email: support@groupconnect.com</li>
          <li>Phone: +92-333-1234567</li>
          <li>Address: Habib University, Karachi, Pakistan</li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
