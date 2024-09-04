import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import './HomePageComponent.css'; // Import the CSS file for styling

const HomePageComponent: React.FC = () => {
  // Sample beaches list
  const beaches = [
    { name: 'Beach 1' },
    { name: 'Beach 2' }
  ];

  return (
    <div className="home-page">
      <HeaderComponent />
      <div className="welcome-section">
        <h2>Welcome to SeaClear</h2>
        <p>Discover the best beaches in Cape Town with real-time water quality information.</p>
      </div>
      <div className="beach-list">
        {beaches.map(beach => (
          <Link key={beach.name} to={`/beach/${beach.name}`} className="beach-link">
            {beach.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePageComponent;
