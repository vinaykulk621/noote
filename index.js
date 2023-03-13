const express = require("express");
const mongoose = require("mongoose");
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
    console.log("Connected To mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const messageSchema = new mongoose.Schema({
  msg: String,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/src/content.html");
});

io.on("connection", (socket) => {
  const url = new URL(socket.handshake.headers.referer);
  const collectionName = url.pathname
    .slice(1)
    .replace(/\/$/, "")
    .replace("/", "_");
  // console.log(collectionName);

  // Check if the model already exists
  const Message =
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, messageSchema, collectionName);
  // mongoose.model(collectionName, messageSchema);
  // console.log(`collection ${collectionName} exist`);

  Message.find()
    .then((messages) => {
      // console.log("Retrieved messages:", messages);
      messages.forEach((msg) => {
        socket.emit("chat message", msg.msg);
      });
    })
    .catch((error) => {
      console.log("Error retrieving messages:", error);
    });

  // Handle new chat messages
  socket.on("chat message", (msg) => {
    const message = encodeURIComponent(new Message({ msg }));
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
  // console.log("listening on http://localhost:3000");
});
