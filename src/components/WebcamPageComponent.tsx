import React, { useState } from 'react';
import './WebcamPage.css'; // Add your styles here

const WebcamPageComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Example beach webcam links
  const beachWebcams = [
    { name: 'Strand Beach', youtubeLink: 'https://www.youtube.com/embed/k19xR19WKCk' }, 
    { name: 'Muizenberg Beach', youtubeLink: 'https://www.youtube.com/embed/oXItWNjqnbc' }, 
    { name: 'Clifton 4th Beach', youtubeLink: 'https://www.youtube.com/embed/eT_W9pSC3mY' }, 
  ];

  const filteredWebcams = beachWebcams.filter(beach =>
    beach.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="webcam-page">
      <h2>Beach Webcams</h2>
      <input
        type="text"
        placeholder="Search for a beach..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="webcam-list">
        {filteredWebcams.map((beach, index) => (
          <div key={index} className="webcam-item">
            <h3>{beach.name}</h3>
            <iframe
              width="560"
              height="315"
              src={beach.youtubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Webcam for ${beach.name}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebcamPageComponent;
