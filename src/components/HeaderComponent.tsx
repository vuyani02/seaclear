import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css'; // Ensure you have a CSS file for styling

const HeaderComponent: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>SeaClear</h1>
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/map" className="nav-link">Map</Link></li>
          <li><Link to="/education" className="nav-link">Educational Content</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/help" className="nav-link">Help Page</Link></li>
          <li><Link to="/report" className="nav-link">Submit Report</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
