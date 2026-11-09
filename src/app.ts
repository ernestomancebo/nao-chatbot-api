import express from "express";
import { networkInterfaces } from "os";
import busRouter from "./routers/busRouter";

const app = express();
express.json();
app.use("/api/v1/bus", busRouter);

app.get("/", (req, res) => {
  res.redirect("/url");
});

app.get("/url", (req, res) => {
  const interfaces = networkInterfaces();
  const wifiInterface = interfaces['Wi-Fi'] || interfaces.Ethernet;

  if (!wifiInterface) {
    res.status(500).send({ error: "No Wi-Fi interface" });
  }

  const interfaceInfo = wifiInterface.find(prop => prop.family === 'IPv4')

  if (!interfaceInfo) { res.status(500).send({ error: "No IPv4 info for Wi-Fi interface" }); }
  res.send({
    url: `http://${interfaceInfo.address}:${process.env.nao_port}`
  });
});

export default app;
