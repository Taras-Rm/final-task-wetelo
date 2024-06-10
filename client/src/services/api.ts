import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(function (cfg) {
  const token = localStorage.getItem("token");

  cfg.headers.Authorization = token ? `Bearer ${token}` : "";

  return cfg;
});

export default api;
