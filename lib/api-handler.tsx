import axios from "axios";

const apiHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ✅ 쿠키 자동 포함 설정
  headers: {
    "Content-Type": "application/json", // 기본 설정
  },
});

apiHandler.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userString = sessionStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        config.headers["Content-Type"] = "application/json";
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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

apiHandler.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 엑세스 토큰 만료로 인한 402 에러 처리
    console.log("error.response", error.response);

    if (error.response?.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              resolve(apiHandler(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, null, {
          headers: {
            // "x-refresh-token": `${refreshToken}`,
            // provider: provider,
          },
          withCredentials: true, // 쿠키 포함
        });

        // 쿠키에 자동 저장되므로 따로 accessToken 저장 불필요
        processQueue(null, "OK");
        return apiHandler(originalRequest);
      } catch (error) {
        // Narrow error type before property access
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object"
        ) {
          const errResponse = (error as any).response;
          if (errResponse?.status === 406) {
            if (errResponse.data?.code === 112) {
              // 리프레시 토큰도 만료된 경우 - 로그아웃 처리 필요
              alert(errResponse.data.message);
              window.location.href = "/";
            } else if (errResponse.data?.code === 104) {
              //비정상적인 접근
              alert(errResponse.data.message);
            }
          }
        }

        console.error(
          "리프레시 토큰이 만료되었습니다. 다시 로그인하세요.",
          error
        );
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiHandler;
