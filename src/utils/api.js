import axios from "axios";
import appStore from "./appStore";
import { clearAccessToken, removeUser, setAccessToken } from "./authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const state = appStore.getState();
  const token = state.auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const excludedRoutes = ["/auth/login", "/auth/signup", "/auth/refresh"];
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !excludedRoutes.includes(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        appStore.dispatch(setAccessToken(res.data.accessToken));
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch {
        appStore.dispatch(removeUser());
        appStore.dispatch(clearAccessToken());
        window.location.href("/");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
