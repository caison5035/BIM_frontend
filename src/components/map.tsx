//pk.eyJ1IjoiY2Fpc29uIiwiYSI6ImNsbHhsNGZobDIwbXMzZHFqcW04eTZocjgifQ.MgXn-EGamoqgkcCBU4wG5g÷
import React, { useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


export default function Map() {
  const [newPlace, setNewPlace] = useState(null);
  const [marker, setMarker] = useState<any>(null);
  console.log(marker, "sdssdsd");
  const [viewPort , setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 4,
  } as any );
  function handleClick(event: any) {
    setMarker({
      latitude: event.lngLat[0],
      longitude: event.lngLat[1],
    });
  }
  const TOKEN =
    "pk.eyJ1IjoiY2Fpc29uIiwiYSI6ImNsbHhsNGZobDIwbXMzZHFqcW04eTZocjgifQ.MgXn-EGamoqgkcCBU4wG5g";
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      mapo
      <ReactMapGl
        {...viewPort}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "100%", transitionDuration: "200" }}
        onViewportChange={(viewPort :  any ) => setViewPort(viewPort)}
        onClick={handleClick}
      >
        {marker && (
          //@ts-ignore
          <>
            <Marker
              latitude={marker?.latitude}
              longitude={marker.longitude}
              
            >
              <div style={{color:"red"}}>📍</div>
            </Marker>
          </>
        )}
      </ReactMapGl>
    </div>
  );
}
