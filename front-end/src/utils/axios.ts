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

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const data = err.response?.data as { message?: string };

    if (status === 401 || status === 403) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (status === 400 && data?.message) {
      return Promise.reject(new Error(data.message));
    }

    return Promise.reject(err);
  }
);

export default api;
