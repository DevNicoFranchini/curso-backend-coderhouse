const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const router = require("./routes/routes.js");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");
const logoutRouter = require("./routes/logout.js");
const config = require("./config/config.js");
const checkUserLogged = require("./middleware/logged.js");

const { Server } = require("socket.io");
const { normalize, schema } = require("normalizr");

const MessagesContainer = require("./containers/MessagesContainer.js");

// Inicializar el servidor
const app = express();
const PORT = config.port;

// Servidor de express
const server = app.listen(PORT, () =>
  console.log(`Ivan, el servidor está corriendo en el puerto ${PORT}`)
);
server.on("error", (error) =>
  console.log(`Hubo un problema en el servidor. Error: ${error}`)
);

// Seteo de cookies
app.use(cookieParser());

// Instanciar apis
// const productsApi = new ProductsContainer("productos.txt");
const messagesApi = new MessagesContainer("./src/files/messages.txt");

// Server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("views", "./src/public/views");
app.set("view engine", "hbs");

// Sessions
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb,
    }),
    secret: "clave",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000,
    },
  })
);

// Routes

app.get("/", checkUserLogged, async (req, res) => {
  const username = req.session.username;
  res.render("home", { username });
});

app.use("/api/productos-test", checkUserLogged, router);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

// Normalización
const authorSchema = new schema.Entity("authors", {});
const msgSchema = new schema.Entity("mensajes", { author: authorSchema });
const chatSchema = new schema.Entity(
  "chat",
  {
    mensajes: [msgSchema],
  },
  { idAttribute: "id" }
);

// Aplicar la normalización
const normalizeData = (data) => {
  const normalizedData = normalize(
    {
      id: "chatHistory",
      mensajes: data,
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

// Configurar el socket
io.on("connection", async (socket) => {
  console.log("Se ha conectado un nuevo cliente con el id:", socket.id);

  // Carga inicial de mensajes
  io.sockets.emit("mensajes", await normalizeMessages());

  // Actualizacion de mensajes
  socket.on("nuevoMensaje", async (mensaje) => {
    console.log(mensaje);
    mensaje.fyh = new Date().toLocaleString();
    await messagesApi.save(mensaje);
    io.sockets.emit("mensajes", await normalizeMessages());
  });
});
