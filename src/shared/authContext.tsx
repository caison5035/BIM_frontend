import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
const url = "http://127.0.0.1:3001";
const AuthContext = createContext<any>({});
 
export const AuthContextProvider = ({ children  } : any ) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token") || '';
    if (token) {
      return jwt_decode(token);
    }
    return null;
  });
 
 
  const login = async (payload : any) => {
    const apiResponse = await axios.post(
      url+"/auth/login",
      payload
    );
    localStorage.setItem("token",  apiResponse.data.data.token);
    setUser(jwt_decode(apiResponse.data.data.token));
    window.location.href = '/map';
  };
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export default AuthContext;