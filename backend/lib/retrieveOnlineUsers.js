import { redisClient } from "../index.js";
import { OnlineUsers } from "../models/user.model.js";

const retrieveOnlineUsers = async (username) => {
    let onlineUsers;
    try {
        onlineUsers = await redisClient.hGetAll("onlineUsers");
        delete onlineUsers[username];
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);

        try {
            onlineUsers = await OnlineUsers.find({ username: { $ne: username } }).project({ _id: 0 });
        }
        catch (err) {
            console.error("Unexpected error occurred", err.message);
            return null;
        }
    }

    return onlineUsers;
}

export default retrieveOnlineUsers;