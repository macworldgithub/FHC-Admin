import axios from "axios";

console.log("REACT_APP_API_BASE_URL", process.env.REACT_APP_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
