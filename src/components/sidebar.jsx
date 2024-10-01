import React from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, Dashboard, Logout, Help } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="uni_logo.png" alt="Habib University" />
      </div>
      <ul className="nav-items">
        <li><Link to="/account"><AccountCircle /> Profile</Link></li>
        <li><Link to="/home"><Dashboard /> Dashboard</Link></li>
        <li><Link to="/help"><Help /> Help</Link></li>
        <li><Link to="/logout"><Logout /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
