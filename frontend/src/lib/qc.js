import axios from "axios";

const server = import.meta.env.VITE_QC_ADDR;

const qcCaller = axios.create({
    baseURL: server,
    withCredentials: true
});

export default qcCaller;