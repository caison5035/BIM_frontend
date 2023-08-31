//pk.eyJ1IjoiY2Fpc29uIiwiYSI6ImNsbHhsNGZobDIwbXMzZHFqcW04eTZocjgifQ.MgXn-EGamoqgkcCBU4wG5g÷
import React, { useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import useBimList from "../hooks/useGetBimList";
import "./map.css";
import BIMListItem from "../models/BIM";

export default function Map({ getLat }: any) {
  const [newPlace, setNewPlace] = useState(null);
  const [marker, setMarker] = useState<any>(null);
  const { bimList } = useBimList();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<BIMListItem[]>([]);
  const bearerToken = localStorage.getItem("token");
  const [filteredData, setFilteredData] = useState<BIMListItem[]>([]);

  const fetchBimList = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:3001/bim/search?search=${searchQuery}`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(bimList, "binlisttt");
  console.log(data, "data===?");
  getLat(marker);

  console.log(marker, "sdssdsd");
  const [viewPort, setViewPort] = useState({
    latitude: 79.3832,
    longitude: 43.6532 ,
    zoom: 2,
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
    /*<div style={{ width: "100vw", height: "100vh" }}>
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
             Debugging: Print latitude and longitude
            <div>{bim?.map?.latitude}</div>
            <div>{bim?.map?.longitude}</div>
          </Marker>
        ))}
      </ReactMapGl>
    </div>*/
    <div>
      mapo
      <div className="d_flex">
        <div className="left_side">
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
        <div className="right_side">
          <div className="flex items-center">
            <div className="flex space-x-1">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <button
                onClick={fetchBimList}
                className="px-4 text-white bg-gray-500 rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {data?.map((bim: any, index: number) => (
            <div key={index}>
              <label>Latitude:</label>
              <h3>{bim?.map?.latitude}</h3>
              <label>Longitude:</label>
              <h3>{bim?.map?.longitude}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
