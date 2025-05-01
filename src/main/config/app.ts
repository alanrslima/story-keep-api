import "express-async-errors";
import https from "https";
import http from "http";
import express from "express";
import { setupMiddleware } from "./middleware";
import { errorHandler } from "../middleware/error-handler";
import fs from "node:fs";

import { authRouter } from "../../module/auth";
import { memoryRouter } from "../../module/memory";
import { setupEventListener } from "./event-listener";

const app = express();

// const server = https.createServer(
//   {
//     maxHeaderSize: 1024 * 1024,
//     cert: fs.readFileSync("certificates/192.168.160.32.pem"),
//     key: fs.readFileSync("certificates/192.168.160.32-key.pem"),
//   },
//   app
// );

const server = http.createServer({ maxHeaderSize: 1024 * 1024 }, app);

setupMiddleware(app);
setupEventListener();

app.use("/api/auth", authRouter);
app.use("/api/memory", memoryRouter);

app.use(errorHandler);

export default server;
