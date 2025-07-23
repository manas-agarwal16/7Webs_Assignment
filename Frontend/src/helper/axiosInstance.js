import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BACKEND_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance; 