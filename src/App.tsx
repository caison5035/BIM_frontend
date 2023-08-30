import React, { useState } from "react";
import UploadBIMObject from "./components/uploadBim";
import axios from "axios";
import "./App.css";
import Layout from "./shared/layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import { AuthContextProvider } from "./shared/authContext";
import ProtectedRoute from "./shared/protectedRoute";
import Map from "../src/components/map";
// import dotenv from "dotenv";
// const env = dotenv.config().parsed;

export default function App() {
  const [getLocation, setLoc] = useState<any>(null);
  const getLat = (marker: any) => {
    console.log(marker, "markerdaTA");
    setLoc(marker);
  };

  const handleUpload = async (selectedFile: any) => {
    console.log(getLocation, "oooo");
    console.log(selectedFile, "oooo");

    if (!selectedFile) {
      alert("Please select a file first."); // Display alert if no file is selected
    } else if (!getLocation) {
      alert("Please select location to tag with bim file."); // Display alert if no file is selected
    } else {
      // Logic for handling selected location
      const formData = new FormData();
      formData.append("file", selectedFile as Blob);
      formData.append("longitude", getLocation.longitude);
      formData.append("latitude", getLocation.latitude);

      try {
        const response = await axios.post(
          `http://127.0.0.1:3001/bim/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data); // Handle response data
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route
              path='/login'
              element={
                <ProtectedRoute accessBy='non-authenticated'>
                  <Login />
                </ProtectedRoute>
              }></Route>
            <Route
              path='/map'
              element={
                <ProtectedRoute accessBy='authenticated'>
                  <UploadBIMObject handleUpload={handleUpload} />
                  <Map getLat={getLat} />
                </ProtectedRoute>
              }></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
