import React, { useState } from "react";
import UploadBIMObject from "./components/uploadBim";
import jwtInterceptor from "./shared/jwtInterceptor";
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

                  <Map getLat={getLat} />
                </ProtectedRoute>
              }></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
