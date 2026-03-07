import jwt from "jsonwebtoken";
import { redisClient } from "../index.js";

export const ioAuth = async (socket, next) => {
    const token = socket.handshake.auth.token;

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = payload.userId;
        const userExists = !!(await redisClient.hGet(userId));

        if (userExists)
            throw new Error("User already exists!");

        socket.userId = userId;
        next();
    }
    catch (err) {
        next(err);
    }
}