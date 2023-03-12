const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const uri =
  "mongodb+srv://purkz:SpongebobIsGay621@cluster0.hsz14uv.mongodb.net/database?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected To mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection successful");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/content.html");
});

io.on("connection", (socket) => {
  console.log("New Client Connected", socket.handshake.headers.referer);
  const url = new URL(socket.handshake.headers.referer);
  const collectionName = url.pathname.slice(1).replace("/", "_");
  console.log("collection", collectionName);

  db.collection(collectionName)
    .find()
    .toArray()
    .then((messages) => {
      messages.forEach((msg) => {
        socket.emit("chat message", msg.msg);
      });
    })
    .catch((error) => {
      console.log("Error retrieving messages:", error);
    });

  // Handle new chat messages
  socket.on("chat message", (msg) => {
    const message = { msg };
    db.collection(collectionName)
      .insertOne(message)
      .then(() => {
        io.emit("chat message", msg);
      })
      .catch((error) => {
        console.log("Error saving message:", error);
      });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
