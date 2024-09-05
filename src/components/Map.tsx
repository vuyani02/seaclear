import "./mapstyle.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function Map() {
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
      <Marker position={[-33.9289920, 18.4173960]}>
        <Popup>
      	  Example Beach
        </Popup>
</Marker>
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
