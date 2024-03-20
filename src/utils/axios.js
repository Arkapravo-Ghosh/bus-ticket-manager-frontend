import axios from "axios";
import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;
const authtoken = Cookies.get("authtoken");

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Authorization": `Bearer ${authtoken}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;