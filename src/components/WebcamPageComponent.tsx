import React from 'react';
import './WebcamPage.css'; // Add your styles here

const WebcamPageComponent: React.FC = () => {
  // Example beach webcam links
  const beachWebcams = [
    { name: 'Beach 1', youtubeLink: 'https://www.surfline.com/surf-report/muizenberg/584204204e65fad6a77094b7?camId=6299f622df6f2e126154ad17&view=table' }, 
    { name: 'Beach 2', youtubeLink: 'https://www.surfline.com/surf-report/llandudno/604f9d394046841199fe5d9b?view=table' }, 
    // Add more beaches and links here
  ];

  return (
    <div className="webcam-page">
      <h2>Beach Webcams</h2>
      <div className="webcam-list">
        {beachWebcams.map((beach, index) => (
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
