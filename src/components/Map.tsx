import axios from "axios";
import "./mapstyle.css"
import "leaflet/dist/leaflet.css"
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

export type tMap ={
  coordinateLat: number;
  coordinateLong: number;
  location: String;
}

export default function Map() {
  const url = 'http://127.0.0.1:8000/api/' // apiURL
  // const [map,setmap] = React.useState();
  const [mapDetail,setmapDetail] = useState<tMap[] | null>();

  // const fetchMapData = () =>{
  useEffect(() =>{
    axios.get(url + 'map/')
    .then((response) => {
      // console.log(response.data)// test what is in response.data
      setmapDetail(response.data)
    })
    .catch((error) =>{
      console.error("Something went wrong", error)
    })
    console.log(mapDetail)// test what is in map object
  },[]);

  return (
    <MapContainer  
         center={[-33.9289920, 18.4173960]}
         zoom={13}
         style={{height: '100vh'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      {mapDetail && mapDetail.map((item, index) => (
        <Marker
          key={index} // Add a unique key to each Marker
          position={[item.coordinateLat, item.coordinateLong] as LatLngExpression}
        >
          <Popup>
            {item.location} {/* Show location */}
          </Popup>
        </Marker>
      ))}

      {/* {mapDetail ? mapDetail.map((tMap) => {
        <Marker
          position={[tMap.coordinateLat, tMap.coordinateLong]}>
          <Popup>
      	    tMap.location
          </Popup>
        </Marker>

      }) : null} */}
      
    </MapContainer>
  );
}





// import { useEffect, useRef } from "react";
// import leaflet from "leaflet";

// export default function Map() {
//   const mapRef = useRef();

//   useEffect(() => {
//     mapRef.current = leaflet
//       .map("map")
//       .setView([33, 0], 13);

//     leaflet
//       .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 19,
//         attribution:
//           '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//       })
//       .addTo(mapRef.current);
//   }, []);

  
//   return <div id="map" ref={mapRef}></div>;
// }



// export default function Map() {
//   return (
//     <div>Map</div>
//   )
// }
