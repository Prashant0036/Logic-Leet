
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials:true ,// attach the cookies,
  headers: {'Content-Type': 'application/json'}
});

// axiosClient.post("/user/register",data) // can do post request like that 


export default axiosClient;