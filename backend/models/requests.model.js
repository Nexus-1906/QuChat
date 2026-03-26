import mongoose from "mongoose";
const { Schema, model } = mongoose;

const requestSchema = new Schema({
    sender: String,
    receiver: String,
    createdOn: Number,
    timeLimitInMs: Number,
    typeOfEncryption: String,
    chatSessionTimeInMin: Number,
    isSimulator: Boolean,
    eavesdropper: Boolean,
    eavesdropperId: String,
    status: String
});

const RequestModel = model('RequestModel', requestSchema);
export default RequestModel;