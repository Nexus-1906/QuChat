import { redisClient } from "../index.js";
import { OnlineUsers } from "../models/user.model.js";

export const socketConnectEvent = async (socket) => {
    socket.broadcast.emit("newUser", socket.userId, socket.id);

    try {
        await redisClient.sAdd("onlineUsers", socket.userId);
        await redisClient.hAdd(`onlineUsers:${socket.userId}`, {
            isBusy: false,
            socketId: socket.id
        });
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);
    }

    try {
        await OnlineUsers.create({
            username: socket.userId,
            socketId: socket.id,
            isBusy: false
        });
    }
    catch (err) {
        console.error("Unexpected error occurred", err.message);
    }
};

export const socketDisconnectEvent = async (socket) => {
    try {
        await redisClient.sRem("onlineUsers", socket.userId);
        await redisClient.del(`onlineUsers:${socket.userId}`);
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