import { redisClient } from "../index.js";
import { OnlineUsers } from "../models/user.model.js";

export const socketConnectEvent = async (socket) => {
    socket.broadcast.emit("newUser", socket.userId);

    try {
        await redisClient.hSet("onlineUsers", socket.userId, false);
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);
    }

    try {
        await OnlineUsers.create({
            username: socket.userId,
            isBusy: false
        });
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);
    }
};

export const socketDisconnectEvent = async (socket) => {
    try {
        await redisClient.hDel("onlineUsers", socket.userId);
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);
    }

    try {
        await OnlineUsers.deleteOne({ username: socket.userId });
        socket.broadcast.emit("userLeft", socket.userId);
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);
    }
};