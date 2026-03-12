import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { mongoConnect, redisConnect } from "./lib/dbConnect.js";
import authRouter from "./routes/auth.route.js";
import apiRouter from "./routes/api.route.js";

const app = express();
const SERVER_PORT = 8596;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:8595', 'http://localhost:8597']
}));

app.use("/auth", authRouter);
app.use("/api", apiRouter);

const redisClient = await redisConnect();
mongoConnect();

app.listen(SERVER_PORT, () => {
    console.log(`App started on PORT ${SERVER_PORT}`);
});

export { redisClient };