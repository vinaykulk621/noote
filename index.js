const express = require('express');
const mongoose = require('mongoose');

const uri = "mongodb+srv://purkz:SpongebobIsGay621@cluster0.hsz14uv.mongodb.net/database?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connencted");
}).catch(e => { console.log(e); })
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});