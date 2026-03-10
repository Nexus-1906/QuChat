import RequestModel from "../models/requests.model.js";

export const persistRequestController = async (req, res) => {
    const { senderId, receiverId, roomId } = req.body;

    await RequestModel.create({
        sender: senderId,
        receiver: receiverId,
        roomId: roomId
    });

    return res.status(200).json({
        msg: "Request persisted successfully!"
    });
};

export const deleteRequestController = async (req, res) => {
    const roomId = req.body.roomId;
    await RequestModel.deleteOne({ roomId: roomId });
    return res.status(204);
};