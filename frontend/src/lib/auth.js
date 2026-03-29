import axios from "axios";

const authCaller = axios.create({
    baseURL: "http://localhost:8596/auth",
    withCredentials: true
});

export default authCaller;