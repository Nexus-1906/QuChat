import retrieveOnlineUsers from "../lib/retrieveOnlineUsers.js";

export const verifyAccessTokenController = (_, res) => {
    return res.status(200).json({ msg: "Access token verified successfully!" });
};

export const getOnlineUsersController = async (_, res) => {
    const onlineUsers = await retrieveOnlineUsers();
    if (onlineUsers === null)
        return res.status(500).json({ error: "Internal Server Error" });
    return res.status(200).json({ onlineUsers });
}