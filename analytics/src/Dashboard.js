// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header Section with Menu Bar */}
      <div className="header">
        <div className="headline">NeuroNex Intelligence Analytics</div>
        <div className="menu">
          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <h1>Welcome to the Dashboard</h1>
      {/* Operations Section */}
      <h2>Operations</h2>
      <div className="section">
        <Link to="/save-data" className="card card-save card-link">
          <h3>User Manual</h3>
          <p> Learn how to use this platform.</p>
        </Link>
        <Link to="/export-data" className="card card-export card-link">
          <h3>Import Data</h3>
          <p>Import your data in various formats.</p>
        </Link>
        <Link to="/view-data" className="card card-view card-link">
          <h3>View Data</h3>
          <p>Access and view your stored data.</p>
        </Link>
      </div>

      {/* Services Section */}
      <h2>Services</h2>
      <div className="section">
        <Link to="/smart-analysis" className="card card-smart card-link">
          <h3>Dataset Summary</h3>
          <p>Get detailed infromation of your dataset.</p>
        </Link>
        <Link to="/predictive-analysis" className="card card-predictive card-link">
          <h3>Algorithm Analysis</h3>
          <p>Analyze datasets with algorithm analysis.</p>
        </Link>
        <Link to="/visualization" className="card card-visualization card-link">
          <h3>Visualization</h3>
          <p>Visualize data in interactive charts.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
