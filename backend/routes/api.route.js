import express from "express";
import {
    persistRequestController, finishRequestController,
    eavesdroppableRequestsController, eavesdropController
} from "../controllers/request.api.controller.js";
import { getOnlineUsersController, verifyAccessTokenController } from "../controllers/actions.api.controller.js";

const apiRouter = express.Router();

apiRouter.get("/verify", verifyAccessTokenController);
apiRouter.get("/getOnlineUsers", getOnlineUsersController);

apiRouter.post("/persistRequest", persistRequestController);
apiRouter.get("/getEavesdroppableRequests", eavesdroppableRequestsController);
apiRouter.patch("/eavesdrop/:roomId", eavesdropController);
apiRouter.delete("/finishRequest", finishRequestController);

export default apiRouter;