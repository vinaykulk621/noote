/** @format */

const express = require("express");
const mongoose = require("mongoose");
const Msg = require("./message");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

mongoose.set("strictQuery", false);

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
let structure;
app.use((req, res, next) => {
  structure = req.url.split("?");
  console.log("url-structure", structure);
  next();
});

console.log("undefined aa raha hai kya?", structure);
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("New Client Connected", socket.request.url);
  Msg.find()
    .then((messages) => {
      messages.forEach((msg) => {
        socket.emit("chat message", msg.msg);
        // console.log(msg.msg);
      });
    })
    .catch((error) => {
      console.log("Error retrieving messages:", error);
    });

  // Handle new chat messages
  socket.on("chat message", (msg) => {
    const message = new Msg({ msg });
    message
      .save()
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
