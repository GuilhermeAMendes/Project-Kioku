// External Library
import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

AxiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response)
      console.error(
        `[API Error]: ${error.config?.url}`,
        error.response.status,
        error.response.data
      );
    return Promise.reject(error);
  }
);
