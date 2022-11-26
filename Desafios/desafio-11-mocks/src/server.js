const express = require("express");
const options = require("./config/dbConfig.js");

const { Server } = require("socket.io");

const MysqlContainer = require("./containers/MysqlContainer.js");

// Inicializar el servidor
// Esto es para no limitar el puerto al subirlo a producción
const app = express();
const PORT = process.env.PORT || 8080;

// Servidor de express
const server = app.listen(PORT, () =>
  console.log(`Ivan, el servidor está corriendo en el puerto ${PORT}`)
);
server.on("error", (error) =>
  console.log(`Hubo un problema en el servidor. Error: ${error}`)
);

// Instanciar apis
const productsApi = new MysqlContainer(options.mariaDB, "productos");
const messagesApi = new MysqlContainer(options.sqliteDB, "messages");

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
  socket.emit("productos", await productsApi.getAll());

  // Actualización de productos
  socket.on("update", async (producto) => {
    await productsApi.save(producto);
    io.sockets.emit("productos", await productsApi.getAll());
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
