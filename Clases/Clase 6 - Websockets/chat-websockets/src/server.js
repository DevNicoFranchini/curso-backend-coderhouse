const express = require("express");
const app = express();

const { Server } = require("socket.io");

// Esto es para no limitar el puerto al subirlo a producción
const PORT = process.env.PORT || 8080;

// Servidor de express
const server = app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
);

// Servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

const hisoticoMensajes = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado", socket.id);
  socket.broadcast.emit("newUser");
  socket.emit("historico", hisoticoMensajes);
  socket.on("msg", (data) => {
    console.log(data);
    hisoticoMensajes.push(data);
    io.sockets.emit("historico", hisoticoMensajes);
  });
});
