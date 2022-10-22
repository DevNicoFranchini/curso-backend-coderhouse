const express = require("express");

const { Server } = require("socket.io");

const app = express();

// Crea el servidor de express y lo coloca a funcionar en un puerto
const server = app.listen(8080, () => console.log("Listening on port 8080"));

// io por convención: servidor de websocket
const io = new Server(server); // Conectamos con el servidor principal.

app.use(express.static(__dirname + "/public"));

// Crear la conexión del socket del cliente con el socket del servidor
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado", socket.id);

  //Enviar información del lado del servidor al cliente
  socket.emit("messageFromServer", "Se ha conectado exitosamente");

  socket.on("letras", (dataDelCliente) => {
    console.log(dataDelCliente);
    // Emitir información para todos los clientes conectados
    io.sockets.emit("messages", dataDelCliente);
  });
});
