import React from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, Dashboard, Logout, Help } from '@mui/icons-material';

const Sidebar = () => {
  const goToHabib = () => {
    window.location.href = 'https://habib.edu.pk/';  
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="circle.png" alt="Habib University" onClick={goToHabib}/>
      </div>
      <ul className="nav-items">
        <li><Link to="/profile"><AccountCircle /> Profile</Link></li> 
        <li><Link to="/home"><Dashboard /> Dashboard</Link></li>
        <li><Link to="/help"><Help /> Help</Link></li>
        <li><Link to="/"><Logout /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
