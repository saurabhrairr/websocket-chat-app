const exprees = require("express");
const app = exprees();
const { Server } = require("socket.io");

const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

app.use(exprees.static(path.resolve("./public")));
server.listen(9000, () => {
  console.log(`listening on ${9000}`);
});

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});






io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})




