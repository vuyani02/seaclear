import axios from "axios";
import "./mapstyle.css"
import "leaflet/dist/leaflet.css"
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression, marker } from "leaflet";

export type tMap ={
  coordinateLat: number;
  coordinateLong: number;
  location: String;
  beach:number;
}

export type tBeach ={
 id:number;
 status:string;
 name: string;
 location: string;
 description: string;
 current_temperature: number;
 current_rain: string;
 current_wind_speed: number;
 saturday_temperature: number;
 saturday_rain: string;
 saturday_wind_speed: number;
 sunday_temperature: number;
 sunday_rain: string;
 sunday_wind_speed: number;
 funFacts: string;
}

export default function Map() {
  const url = 'http://127.0.0.1:8000/api/' // apiURL
  const [mapDetail,setmapDetail] = useState<tMap[] | null>();
  const [beaches,setbeaches] = useState<tBeach[] | null>();
  
  useEffect(() =>{
    axios.get(url + 'map/')
    .then((response) => {
      setmapDetail(response.data)
    })
    .catch((error) =>{
      console.error("Something went wrong", error)
    })
  },[]);

  useEffect(() =>{
    axios.get(url + 'beaches/')
    .then((response) => {
      setbeaches(response.data)
    })
    .catch((error) =>{
      console.error("Something went wrong", error)
    })
  },[]);

  // Function to get beach data by location ID
  const getBeachData = (mapId: number): tBeach | undefined => {
    return beaches?.find(beach => beach.id === mapId);
  };

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
      {mapDetail && mapDetail.map((item, index) => {
        const beach = getBeachData(item.beach);
        return (
          <Marker
            key={index} // Add a unique key to each Marker
            position={[item.coordinateLat, item.coordinateLong] as LatLngExpression}
          >
            <Popup>
              <div>
                <strong>{beach ? beach.name : "N/A"}</strong>
                <br />
                <strong>Status:</strong>
                <br />
                {beach ? beach.status : "Status Unknown"}
                <br />
                <strong>Location:</strong>
                <br />
                {beach ? beach.location : "N/A"}
                <br />
                <strong>Weather Conditions</strong>
                <br />
                <strong>[Temperatur,Rainfall,Wind Speed]</strong>
                <br />
                <strong>Today:</strong>
                <br />
                {beach ? `${beach.current_temperature} °C, ${beach.current_rain}, ${beach.current_wind_speed} km/h` : "N/A"}
                <br />
                <strong>Saturday:</strong> 
                <br />
                {beach ? `${beach.saturday_temperature} °C, ${beach.saturday_rain}, ${beach.saturday_wind_speed} km/h` : "N/A"}
                <br />
                <strong>Sunday: </strong>
                <br />
                {beach ? `${beach.sunday_temperature} °C, ${beach.sunday_rain}, ${beach.sunday_wind_speed} km/h` : "N/A"}
                <br />
                <strong>Description:</strong> 
                <br />
                {beach ? beach.description : "N/A"}
                <br />
                <strong>Fun Facts:</strong> 
                <br />
                {beach ? beach.funFacts : "N/A"}
              </div>
            </Popup>
          </Marker>
        );
      })}
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
