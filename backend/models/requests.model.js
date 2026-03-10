import mongoose from "mongoose";
const { Schema, model } = mongoose;

const requestSchema = new Schema({
    sender: String,
    receiver: String,
    roomId: String
});

const RequestModel = model('RequestModel', requestSchema);
export default RequestModel;