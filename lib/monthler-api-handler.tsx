// lib/api/monthlerApiHandler.ts

import axios from "axios";

const monthlerApiHandler = axios.create({
  baseURL: "https://dev-api.monthler.kr",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

monthlerApiHandler.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userString = sessionStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

monthlerApiHandler.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              resolve(monthlerApiHandler(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        await axios.post(`https://dev-api.monthler.kr/refresh`, null, {
          withCredentials: true,
        });

        processQueue(null, "OK");
        return monthlerApiHandler(originalRequest);
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object"
        ) {
          const errResponse = (error as any).response;
          if (errResponse?.status === 406) {
            if (errResponse.data?.code === 112) {
              alert(errResponse.data.message);
              window.location.href = "/";
            } else if (errResponse.data?.code === 104) {
              alert(errResponse.data.message);
            }
          }
        }

        console.error("리프레시 토큰 만료: 다시 로그인 필요", error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default monthlerApiHandler;
