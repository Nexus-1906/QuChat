import axios from "axios";
import authCaller from "./auth";

const server = import.meta.env.VITE_SERVER_ADDR;

const apiCaller = axios.create({
    baseURL: `${server}/api`,
    headers: { "Authorization": localStorage.getItem("access-token") },
    withCredentials: true
});

apiCaller.interceptors.response.use(
    null,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;

            const authResponse = await authCaller.post("/refresh");
            localStorage.setItem("access-token", `Bearer ${authResponse.data.accessToken}`);
            originalRequest.headers.Authorization = localStorage.getItem("access-token");
            
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
)

export default apiCaller;