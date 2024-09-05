import React from 'react';
import './BeachList.css'; 

// import * as L from 'leaflet'
// import { MapContainer, TileLayer } from 'react-leaflet';

import Map from "./Map";

const MapPage: React.FC = () => {
  return (

     <div className="Map">
      <Map />
     </div>
 
  // map: L.Map;
  // centroid: L.LatLngExpression = [0.0]; 

  // map = L.map('map', {
  //   center: centroid,
  //   zoom: 12
  // });

  // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 18,
  //   minZoom: 10,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // });

  // tiles.addTo(map);
    
    // <MapContainer>
    //   center={[33.18]}
    //   zoom={13}
    //   style={{height: '100vh'}}
    //   <TileLayer 
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    //   />
    // </MapContainer>


  );
};

export default MapPage;
