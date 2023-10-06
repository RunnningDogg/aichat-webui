import axios from "axios";
import { message } from "antd";
import { getGlobalAccessToken, setGlobalAccessToken } from "../utils/auth";

const isDev = process.env.NODE_ENV === "development";

const myAxios = axios.create({
  baseURL: isDev ? "" : "https://api.runningpig.top",
});
// axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

myAxios.interceptors.request.use(
  (config) => {
    // 在请求头中添加认证信息
    const accessToken = getGlobalAccessToken();

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 如果收到401 Unauthorized响应，重定向到登录页
      setGlobalAccessToken("");
      message.error("登录过期，请重新登录");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    return Promise.reject(error);
  },
);

export default myAxios;
