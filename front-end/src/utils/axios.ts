import axios from "axios";
import { getToken } from "../services/authService";

const backendUrl = process.env.REACT_APP_API_URL;
if (!backendUrl) throw new Error("URL do backend não definida");

const api = axios.create({
  baseURL: backendUrl,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
