import express from "express";
import { persistRequestController, deleteRequestController } from "../controllers/request.api.controller.js";

const apiRouter = express.Router();

apiRouter.post("/persistRequest", persistRequestController);
apiRouter.delete("/deleteRequest", deleteRequestController);

export default apiRouter;