import axios from "axios";

const apiCaller = axios.create({
    baseURL: "http://localhost:8596/api",
    headers: { "Authorization": localStorage.getItem("access-token") },
    withCredentials: true
});

export default apiCaller;