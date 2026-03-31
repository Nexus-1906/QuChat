import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../lib/checkAuth";
import apiCaller from "../lib/api";
import { toast } from "react-toastify";

function HomePage() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [eavesdroppableRequests, setEavesdroppableRequests] = useState([]);
    const [requestsToMe, setRequestsToMe] = useState([]);

    const [showRequestsToMe, setShowRequestsToMe] = useState(false);
    const [showEavesdroppableRequests, setShowEavesdroppableRequests] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        checkAuth(navigate, false);
    }, [navigate]);

    useEffect(() => {
        async function getOnlineUsers() {
            try {
                const response = await apiCaller.get("/getOnlineUsers");
                setOnlineUsers(response.data.onlineUsers);
            }
            catch (error) {
                console.log("Unexpected error occurred", error);
                toast.error("Could not get online users!");
            }
        };

        getOnlineUsers();
    }, []);

    useEffect(() => {
        async function getRequestsToMe() {
            try {
                const response = await apiCaller.get("/getMyActiveRequests");
                setRequestsToMe(response.data.requests);
            }
            catch (error) {
                console.log("Unexpected error occurred", error);
                toast.error("Could not get your active requests!");
            }
        };

        getRequestsToMe();
    }, []);

    useEffect(() => {
        async function getEavesdroppableRequests() {
            try {
                const response = await apiCaller.get("/getEavesdroppableRequests");
                setEavesdroppableRequests(response.data.requests);
            }
            catch (error) {
                console.log("Unexpected error occurred", error);
                toast.error("Could not get eavesdroppable requests!");
            }
        };

        getEavesdroppableRequests();
    }, []);
}

export default HomePage;