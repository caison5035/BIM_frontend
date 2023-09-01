import React, { useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import BIMListItem from "../models/BIM";
import UploadBIMObject from "./uploadBim";
import { MarkerItem } from "../models/Marker";
import NotificationBar from "../shared/notifBar";
import { getBimList, handleUpload } from "../services/api";

export default function Map() {
  const [marker, setMarker] = useState<MarkerItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<BIMListItem[]>([]);
  const TOKEN =
    "pk.eyJ1IjoiY2Fpc29uIiwiYSI6ImNsbHhsNGZobDIwbXMzZHFqcW04eTZocjgifQ.MgXn-EGamoqgkcCBU4wG5g";

  const fetchListWrapper = async () => {
    const list = await getBimList();
    setData(list);
    if (showModal) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchListWrapper();
  });

  const handleModalClose = () => {
    setShowModal(false);
  };

  const viewPort = {
    latitude: 79.3832,
    longitude: 43.6532,
    zoom: 2,
  };

  const handleMapClick = (event: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = event?.lngLat;
    setMarker({
      latitude: lat,
      longitude: lng,
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (selectedFile: any, marker: MarkerItem) => {
    await handleUpload(selectedFile, marker);
    fetchListWrapper();
  };

  return (
    <div>
      {/* Notification bar */}
      <NotificationBar isShown={true} />

      <div className="d_flex">
        <div className="left_side">
          <ReactMapGl
            {...viewPort}
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{ width: "100%", height: "100%", transitionDuration: "200" }}
            onClick={handleMapClick}
          >
            {data?.map((bim: BIMListItem, index: number) => (
              <Marker
                key={index}
                latitude={parseFloat(bim?.map?.latitude.toString())}
                longitude={parseFloat(bim?.map?.longitude.toString())}
              >
                <div style={{ color: "red", fontSize: "20px" }}>📍</div>
                <div>{bim?.map?.latitude.toString()}</div>
                <div>{bim?.map?.longitude.toString()}</div>
              </Marker>
            ))}
          </ReactMapGl>
        </div>
        <div className="right_side">
          <div className="flex items-center">
            <div className="flex space-x-1 search-input-container">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                className="search-inp block w-full px-4 py-2 text-white bg-white border rounded-full focus:border-white focus:ring-white focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <button
                onClick={fetchListWrapper}
                className="px-4 text-white bg-gray-500 rounded-full"
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
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 mt-1">
            {data?.map((bim: BIMListItem, index: number) => (
              <li className="pb-3 sm:pb-4 search-item" key={index}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{bim.name}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Longitude : <>{bim?.map?.latitude}</>
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Latitude : <>{bim?.map?.longitude}</>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {showModal && (
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <UploadBIMObject
                    handleUpload={handleFormSubmit}
                    selectedMarker={marker}
                    handleClose={handleModalClose}
                    key={marker?.latitude}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
