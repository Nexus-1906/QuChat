import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiCaller from "../lib/api";
import authCaller from "../lib/auth";
import { toast } from "react-toastify";
import LoginUI from "../components/LoginUI";
import SignupUI from "../components/SignupUI";

function OnboardPage() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * checkAuth
         * 
         * call /api/verify -> if success, navigate to home
         * call /auth/refresh -> if success, navigate to home
         * 
         * if ok, continue
         */
        apiCaller.get("/verify")
        .then(() => {
            navigate("/");
        })
        .catch(() => {
            authCaller.post("/refresh")
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                toast.info("Login to avail services");
            });
        });
    });

    return isLogin ? <LoginUI setIsLogin={setIsLogin} /> : <SignupUI setIsLogin={setIsLogin} />;
}

export default OnboardPage;