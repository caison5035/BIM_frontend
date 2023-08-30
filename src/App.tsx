import "./App.css";
import Layout from "./shared/layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import { AuthContextProvider } from "./shared/authContext";
import ProtectedRoute from "./shared/protectedRoute";
import Map from "../src/components/map";

function App() {
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
                  <Map />
                </ProtectedRoute>
              }></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
