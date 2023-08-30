//pk.eyJ1IjoiY2Fpc29uIiwiYSI6ImNsbHhsNGZobDIwbXMzZHFqcW04eTZocjgifQ.MgXn-EGamoqgkcCBU4wG5g÷
import React, { useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import useBimList from "../hooks/useGetBimList";

export default function Map({ getLat }: any) {
  const [newPlace, setNewPlace] = useState(null);
  const [marker, setMarker] = useState<any>(null);
  const { bimList } = useBimList();

  console.log(bimList, "binlisttt");
  getLat(marker);

  console.log(marker, "sdssdsd");
  const [data, setData] = useState([]);
  const [viewPort, setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 4,
  } as any);
  function handleClick(event: any) {
    const { lat, lng } = event?.lngLat;
    console.log(lat, "eventttt");
    setMarker({
      latitude: lat,
      longitude: lng,
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
        onViewportChange={(viewPort: any) => setViewPort(viewPort)}
        onClick={handleClick}
      >
        {bimList?.map((bim: any, index: number) => (
          <Marker
            key={index}
            latitude={parseFloat(bim?.map?.latitude)}
            longitude={parseFloat(bim?.map?.longitude)}
          >
            <div style={{ color: "red", fontSize: "20px" }}>📍</div>
            {/* Debugging: Print latitude and longitude */}
            <div>{bim?.map?.latitude}</div>
            <div>{bim?.map?.longitude}</div>
          </Marker>
        ))}
      </ReactMapGl>
    </div>
  );
}
