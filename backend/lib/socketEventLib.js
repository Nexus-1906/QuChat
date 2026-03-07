import { redisClient } from "../index.js";

export const socketConnectEvent = async (socket) => {
    socket.broadcast.emit("newUser", socket.userId);
    await redisClient.hSet("onlineUsers", socket.userId, socket.id);
};

export const socketDisconnectEvent = async (socket) => {
    socket.broadcast.emit("userLeft", socket.userId);
    await redisClient.hDel("onlineUsers", socket.userId);
};