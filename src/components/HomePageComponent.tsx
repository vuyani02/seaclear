import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePageComponent.css'; // Import the CSS file for styling
import axios from 'axios';

const HomePageComponent: React.FC = () => {
  
  type tBeach ={
    name: string;
    urlName: string;
    description: string;
    status: string;
    location: string;
  }

  const [beaches,setBeaches] = useState<tBeach[] | null>();
  const url = 'https://seaclear.onrender.com/api/' // apiURL
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
    beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    beach.location.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link to={`/beach/${beach.urlName}`} className="beach-link">
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
