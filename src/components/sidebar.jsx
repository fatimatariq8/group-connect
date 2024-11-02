import React from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, Dashboard, Logout, Help } from '@mui/icons-material';
import circleImage from '../assets/circle.png'; 

const Sidebar = ({ userId }) => {
  const goToHabib = () => {
    window.location.href = 'https://habib.edu.pk/';  
  };
  
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={circleImage} alt="Habib University" onClick={goToHabib}/>
      </div>
      <ul className="nav-items">
        <li><Link to={`/profile/${userId || 'default'}`}><AccountCircle /> Profile</Link></li>
 
        <li><Link to={`/home/${userId}`}><Dashboard /> Dashboard</Link></li>
        <li><Link to={`/help/${userId}`}><Help /> Help</Link></li>
        <li><Link to="/login"><Logout /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
