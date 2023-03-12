/** @format */

const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const next = require("next");
const db = require("./db");

const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = () => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  return httpServer;
};

app.prepare().then(() => {
  const server = createServer();

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
