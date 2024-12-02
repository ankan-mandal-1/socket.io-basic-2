const express = require("express")
const app = express();

const http = require("http")
const expressServer = http.createServer(app)

const {Server} = require("socket.io")
const io = new Server(expressServer);

let buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
    buyNsp.emit("MyEvent", "hello BUY")
})

let sellNsp = io.of("/sell")
sellNsp.on("connection", (socket) => {
    sellNsp.emit("MyEvent", "hello SELL")
})

io.on("connection", (socket) => {
    console.log("New user connected!")

    socket.send("Learn with Henry");

    // setInterval(() => {
    //     let d = new Date();
    //     let t = d.getTime();
    //     // socket.send(t)
    //     socket.emit("MyEvent", t)
    // }, 2000)

    // socket.on("message", (msg) => {
    //     console.log(msg)
    // })

    //Broadcast
    io.sockets.emit("MyBroadcast", "Hello everyone")

    socket.on("MyEvent", (msg) => {
        console.log(msg)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnect")
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

expressServer.listen(3000, () => {
    console.log("Server is running at 3000")
})