const express = require("express");
const options = require("./config/dbConfig.js");

const { Server } = require("socket.io");
const { normalize, schema } = require("normalizr");

const MysqlContainer = require("./containers/MysqlContainer.js");
const MessagesContainer = require("./containers/MessagesContainer.js");
const ProductsContainer = require("./containers/ProductsContainer.js");

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
// const productsApi = new MysqlContainer(options.mariaDB, "productos");
// const messagesApi = new MysqlContainer(options.sqliteDB, "messages");
const productsApi = new ProductsContainer();
const messagesApi = new MessagesContainer("./src/files/messages.txt");

// Normalización
const authorSchema = new schema.Entity("authors", {});
const msgSchema = new schema.Entity("msgs", { author: authorSchema });
const chatSchema = new schema.Entity(
  "chat",
  {
    msgs: [msgSchema],
  },
  { idAttribute: "id" }
);

// Aplicar la normalización
const normalizeData = (data) => {
  const normalizedData = normalize(
    {
      id: "chatHistory",
      msgs: data,
    },
    chatSchema
  );
  return normalizedData;
};

const normalizeMessages = async () => {
  const results = await messagesApi.getAll();
  const normalizedMsgs = normalizeData(results);
  return normalizedMsgs;
};

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
  socket.emit("mensajes", await normalizeMessages());

  // Actualizacion de mensajes
  socket.on("nuevoMensaje", async (mensaje) => {
    console.log(mensaje);
    mensaje.fyh = new Date().toLocaleString();
    await messagesApi.save(mensaje);
    io.sockets.emit("mensajes", await normalizeMessages());
  });
});
