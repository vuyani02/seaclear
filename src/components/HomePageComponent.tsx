import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePageComponent.css'; // Import the CSS file for styling
import axios from 'axios';

const HomePageComponent: React.FC = () => {
  // const beaches = [
  //   { name: 'Beach 1', description: 'A popular beach with clear waters.', status: 'SAFE' },
  //   { name: 'Beach 2', description: 'A quieter beach with occasional pollution.', status: 'UNSAFE' },
  //   // Add more beach entries here
  // ];

  //axios get beach from database
  type tBeach ={
    name: string;
    description: string;
    status: string;
  }

  const [beaches,setBeaches] = useState<tBeach[] | null>();
  const url = 'http://127.0.0.1:8000/api/' // apiURL
  useEffect(() =>{
    axios.get(url + 'beaches/')
    .then((response) => {
      setBeaches(response.data)
    })
    .catch((error) =>{
      console.error("Something went wrong", error)
    })
  },[]);
  //----------------------------------------------------------

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBeaches = (beaches || []).filter(beach =>
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
            <div key={beach.name} className="beach-item">
              <Link to={`/beach/${beach.name}`} className="beach-link">
                <h3>{beach.name}</h3>
              </Link>
              <p>{beach.description}</p>
              <p className={`beach-status ${beach.status.toLowerCase()}`}>
                {beach.status}
              </p>
            </div>
          ))
        ) : (
          <p>No beaches found</p>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
