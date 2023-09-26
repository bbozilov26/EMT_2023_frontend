import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_PRODUCTS_ENV,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.data && config.headers["Content-Type"] === "application/json") {
      config.data = {};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
