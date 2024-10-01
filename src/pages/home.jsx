import React from 'react';
import Navbar from '../components/nav';
import Sidebar from '../components/sidebar';
import CardGrid from '../components/cardgrid';
import '../styles/home.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <CardGrid />
      </div>
    </div>
  );
};

export default Dashboard;
