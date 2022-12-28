const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
const messageRouter = require("./routes/messageRoutes");



require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRouter);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("Connected to DB and is ready to go!");
});


const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Server ready to go!");
});

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});


global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    console.log("Connected to socket.io");

    //Add user to online users.
    socket.on("add-user", (username) => {
        onlineUsers.set(username, socket.id);
        console.log(onlineUsers);
    });

    
    socket.on('send-msg', (data) => {
        io.sockets.emit('msg-recieve', data);
    });

});
