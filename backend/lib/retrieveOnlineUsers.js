import { redisClient } from "../index.js";
import { OnlineUsers } from "../models/user.model.js";

const retrieveOnlineUsers = async (currUserId) => {
    let onlineUsers;
    try {
        const onlineUsersObj = await redisClient.hGetAll("onlineUsers");
        delete onlineUsersObj[currUserId];
        onlineUsers = Object.entries(onlineUsersObj)
            .map(([username, socketId]) => ({ username, socketId }));
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);

        try {
            onlineUsers = await OnlineUsers
                .find({ username: { $ne: currUserId }, isBusy: false })
                .select({ isBusy: 0, _id: 0 })
                .toArray();
        }
        catch (err) {
            console.error("Unexpected error occurred", err.message);
            return null;
        }
    }

    return onlineUsers;
}

export default retrieveOnlineUsers;