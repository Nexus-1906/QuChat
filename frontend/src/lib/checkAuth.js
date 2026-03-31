import apiCaller from "./api";
import { toast } from "react-toastify";

/**
 * checkAuth
 * 
 * call /api/verify -> if success, navigate to home / stay in home
 * call /auth/refresh -> if success, navigate to home / stay in home
 * else -> stay in onboard / navigate to onboard
 * 
 */
export default function checkAuth(navigate, forOnboard) {
    let successFn, failureFn;

    if (forOnboard) {
        successFn = () => {
            navigate("/");
            toast.info("You are already logged in!");
        };

        failureFn = () => {
            console.log("Login to avail services");
        };
    }
    else {
        successFn = () => {
            console.log("You are logged in!");
        };

        failureFn = () => {
            navigate("/onboard");
            toast.error("Login to avail services");
        }
    }
    
    apiCaller.get("/verify")
    .then(successFn)
    .catch(failureFn);
}