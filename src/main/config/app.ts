import "express-async-errors";
import http from "http";
import express from "express";
import { setupMiddleware } from "./middleware";
import { errorHandler } from "../middleware/error-handler";

import { authRouter } from "../../module/auth";
import { memoryRouter } from "../../module/memory";
import { setupEventListener } from "./event-listener";

const app = express();
const server = http.createServer({ maxHeaderSize: 1024 * 1024 }, app); // Limite of 1MB

setupMiddleware(app);
setupEventListener();

app.use("/api/auth", authRouter);
app.use("/api/memory", memoryRouter);

app.use(errorHandler);

export default server;
