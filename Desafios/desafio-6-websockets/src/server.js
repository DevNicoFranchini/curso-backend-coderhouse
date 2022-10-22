const express = require("express");
const app = express();

const { Server } = require("socket.io");

const ProductsContainer = require("./containers/ProductsContainer.js");
const MessagesContainer = require("./containers/MessagesContainer.js");

// Inicializar el servidor
// Esto es para no limitar el puerto al subirlo a producción
const PORT = process.env.PORT || 8080;

// Servidor de express
const server = app.listen(PORT, () =>
  console.log(`Ivan, el servidor está corriendo en el puerto ${PORT}`)
);
server.on("error", (error) =>
  console.log(`Hubo un problema en el servidor. Error: ${error}`)
);

// Instanciar apis
const productsApi = new ProductsContainer();
const messagesApi = new MessagesContainer("messages.txt");

// Servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Configurar el socket
io.on("connection", async (socket) => {
  console.log("Se ha conectado un nuevo cliente con el id:", socket.id);

  // Carga inicial de productos
  socket.emit("productos", productsApi.getAll());

  // Actualización de productos
  socket.on("update", (producto) => {
    productsApi.save(producto);
    io.sockets.emit("productos", productsApi.getAll());
  });

  // Carga inicial de mensajes
  socket.emit("mensajes", await messagesApi.getAll());

  // Actualizacion de mensajes
  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await messagesApi.save(mensaje);
    io.sockets.emit("mensajes", await messagesApi.getAll());
  });
});
