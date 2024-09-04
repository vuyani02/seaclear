import React from 'react';
import HeaderComponent from './HeaderComponent';
import './MapPageComponent.css'; // Import the CSS file

const MapPageComponent: React.FC = () => {
  return (
    <div className="map-page">
      <HeaderComponent />
      <h2 className="map-heading">Map</h2>
      <div className="map-content">
        {/* Map implementation here */}
      </div>
    </div>
  );
};

export default MapPageComponent;
