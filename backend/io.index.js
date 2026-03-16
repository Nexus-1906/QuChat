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

    socket.on("sendJoinRequest", async (receiverId, request) =>
        await sendJoinRequestEvent(socket, receiverId, request));

    socket.on("eavesdropRequest", async roomId =>
        await eavesdropRequestEvent(socket, roomId));

    socket.on("accept", async roomId => await acceptEvent(socket, roomId));
    socket.on("reject", async roomId => await rejectEvent(socket, roomId));
    socket.on("joinAck", async (roomId, ack) =>
        await joinAckEvent(socket, roomId, ack));

    socket.on("sendMessage", (roomId, encryptedMessage) =>
        sendMessageEvent(socket, roomId, encryptedMessage));

    socket.on("leave", async roomId => await leaveEvent(socket, roomId));
    socket.on("disconnect", async () => await socketDisconnectEvent(socket));
});

export default io;