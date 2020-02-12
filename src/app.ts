import express from "express";
import busRouter from "./routers/busRouter";

const app = express();
express.json();
app.use("/api/v1/bus", busRouter);

export default app;
