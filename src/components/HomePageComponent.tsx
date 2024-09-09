import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePageComponent.css'; // Import the CSS file for styling

const HomePageComponent: React.FC = () => {
  // Sample beaches list
  const beaches = [
    { name: 'Beach 1' },
    { name: 'Beach 2' },
    // Add more beach entries here
  ];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter beaches based on the search query
  const filteredBeaches = beaches.filter(beach =>
    beach.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a beach..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="welcome-section">
        <h2>Welcome to SeaClear</h2>
        <p>Discover the best beaches in Cape Town with real-time water quality information.</p>
      </div>
      <div className="beach-list">
        {filteredBeaches.length > 0 ? (
          filteredBeaches.map(beach => (
            <Link key={beach.name} to={`/beach/${beach.name}`} className="beach-link">
              {beach.name}
            </Link>
          ))
        ) : (
          <p>No beaches found</p>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
