
// server.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/index";

const server = express();

// Middlewares
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Rutas
server.use("/", indexRouter);

export default server;

