import axios, { AxiosInstance } from "axios";
 
const jwtInterceoptor : AxiosInstance = axios.create({});
 
jwtInterceoptor.interceptors.request.use((config : any ) => {
  const token = localStorage.getItem("token") || '[]';
  let tokensData = JSON.parse(token);
  if( config?.headers?.common){
      config.headers.common["Authorization"] = `bearer ${tokensData.access_token}`;
  }
  return config;
});
export default jwtInterceoptor;