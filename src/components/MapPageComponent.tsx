import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPageComponent.css';

const MapPageComponent: React.FC = () => {
  return (
    <div className="map-container">
      <h1 className="map-title">Beaches in Cape Town</h1>
      <MapContainer
        center={[-33.9249, 18.4241]} // Coordinates for Cape Town
        zoom={13}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapPageComponent;
