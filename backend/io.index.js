import { Server } from "socket.io";
import { ioAuth } from "./middleware/socket.middleware.js";
import { socketConnectEvent, socketDisconnectEvent } from "./lib/socketEventLib.js";

const IO_PORT = 8597;

const io = new Server(IO_PORT, {
    cors: {
        origin: ['http://localhost:8595', 'http://localhost:8596']
    }
});
io.use(ioAuth);
io.on("connection", async socket => {
    await socketConnectEvent(socket);
    socket.on("disconnect", () => socketDisconnectEvent(socket));
});

export default io;