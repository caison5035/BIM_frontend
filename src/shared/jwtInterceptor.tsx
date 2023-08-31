import axios, { AxiosInstance } from "axios";
 
const jwtInterceptor : AxiosInstance = axios.create({});
 
jwtInterceptor.interceptors.request.use((config : any ) => {
  const token = localStorage.getItem("token") || '[]';
  console.log(config.headers)
  if( config?.headers){
    config?.headers.setAuthorization(`Bearer ${token}`);
   

  }
  return config;
});
export default jwtInterceptor;