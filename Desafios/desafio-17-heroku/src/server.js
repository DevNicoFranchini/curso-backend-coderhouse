const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bCrypt = require("bcrypt");
const parseArgs = require("minimist");
const cluster = require("cluster");
const os = require("os");

const router = require("./routes/routes.js");
const signupRouter = require("./routes/signup.js");
const signupErrorRouter = require("./routes/signupError.js");
const loginRouter = require("./routes/login.js");
const loginErrorRouter = require("./routes/loginError.js");
const logoutRouter = require("./routes/logout.js");
const randomsRouter = require("./routes/randoms.js");
const infoRouter = require("./routes/info.js");
const config = require("./config/config.js");
const userModel = require("./models/user.js");
const logger = require("./logs/logger.js");

const { Server } = require("socket.io");
const { normalize, schema } = require("normalizr");
const LocalStrategy = require("passport-local").Strategy;

const MessagesContainer = require("./containers/MessagesContainer.js");

// Capturar argumentos
const options = {
  alias: { m: "mode", p: "port" },
  default: { mode: "FORK", port: 8080 },
};
const objArguments = parseArgs(process.argv.slice(2), options);

const MODO = objArguments.mode;
const PORT = objArguments.port;

// Inicializar el servidor
const app = express();

// Servidor de express
if (MODO === "CLUSTER" && cluster.isPrimary) {
  const numCPUS = os.cpus().length; // Num. de núcleos del procesador.
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    cluster.fork();
  });
} else {
  const server = app.listen(PORT, () =>
    console.log(
      `Ivan, el servidor está corriendo en el puerto ${PORT} on process ${process.pid}`
    )
  );
  server.on("error", (error) =>
    console.log(`Hubo un problema en el servidor. Error: ${error}`)
  );

  // Servidor de websocket y lo conectamos con el servidor de express
  const io = new Server(server);

  // Configurar el socket
  io.on("connection", async (socket) => {
    // console.log("Se ha conectado un nuevo cliente con el id:", socket.id);

    // Carga inicial de mensajes
    io.sockets.emit("mensajes", await normalizeMessages());

    // Actualizacion de mensajes
    socket.on("nuevoMensaje", async (mensaje) => {
      //console.log(mensaje);
      mensaje.fyh = new Date().toLocaleString();
      await messagesApi.save(mensaje);
      io.sockets.emit("mensajes", await normalizeMessages());
    });
  });
}

// Server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("views", "./src/public/views");
app.set("view engine", "hbs");

// Seteo de cookies
app.use(cookieParser());

// Instanciar apis
// const productsApi = new ProductsContainer("productos.txt");
const messagesApi = new MessagesContainer("./src/files/messages.txt");

// Connect to DB
const mongoDBUrl = config.mongodb;
mongoose.set("strictQuery", true);
mongoose.connect(
  mongoDBUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error)
      return console.log(
        `Hubo un error conectándose a la base. Error: ${error}`
      );
    console.log("Conexión a la base de datos de manera exitosa");
  }
);

// Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongosessions,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport config
app.use(passport.initialize());
app.use(passport.session());

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// Middleware ruta protegida
const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Login Strategy
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    let user = await userModel.findOne({ username });

    if (!user) {
      console.log(`User not found with username: ${username}`);
      return done(null, false, { message: "User not found" });
    }

    if (!isValidPassword(user, password)) {
      console.log("Invalid password");
      return done(null, false, { message: "Password incorrect" });
    }

    done(null, user);
  })
);

// Signup Strategy
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = await userModel.findOne({ username: username });

      if (user) {
        console.log(`El usuario ${username} ya existe`);
        return done(null, false, { message: "El usuario ya existe" });
      }

      const newUser = new userModel({
        username: username,
        password: createHash(password),
      });

      await newUser.save();

      return done(null, req.body);
    }
  )
);

// Serialize user
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user["_id"],
      username: user.username,
    });
  });
});

// Deserialize user
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Routes
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.session.passport.user.username;
    res.render("home", { username });
  } else {
    res.redirect("/login");
  }
});

// Logger
const infoLogger = (req, res, next) => {
  logger.info(`ruta : ${req.path}, peticion : ${req.method}`);
  next();
};

app.use("/api/productos-test", checkAuth, router);
app.use("/login", loginRouter);
app.use("/loginError", loginErrorRouter);
app.use("/signup", signupRouter);
app.use("/signupError", signupErrorRouter);
app.use("/logout", logoutRouter);
app.use("/api/randoms", randomsRouter);
app.use("/info", infoRouter);

app.use(infoLogger);
app.get("/*", (req, res) => {
  logger.warn(`Ruta: ${req.path} inexistente. Peticion: ${req.method}`);
});

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
