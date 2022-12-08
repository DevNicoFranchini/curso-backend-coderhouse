//importaciones
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; // Estrategia para autenticación
import bcrypt from "bcrypt"; // Encriptar las contraseñas
import mongoose from "mongoose"; // DB usuarios
import MongoStore from "connect-mongo"; // Store session
import { UserModel } from "./models/user.js";
import { Strategy as TwitterStrategy } from "passport-twitter";

// Conectamos a la DB
const mongoUrl =
  "mongodb+srv://nicolasfranchini:9MSz65DpCU@ch-backend-ecommerce.ex9a7cc.mongodb.net/authDB?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error)
      return console.log(`Hubo un error conectándose a la base ${error}`);
    console.log("Conexión a la base de datos de manera exitosa");
  }
);

//servidor express
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//archivos estaticos
const __dirname = dirname(fileURLToPath(import.meta.url)); //ruta server.js
app.use(express.static(__dirname + "/public")); //ruta carpeta public

//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
//ruta de las vistas
app.set("views", __dirname + "/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");

//interpretacion de formato json desde el cliente
app.use(express.json()); //lectura de json desde el cuerpo de la peticion.
app.use(express.urlencoded({ extended: true })); //lectura de json desde un metodo post de formulario

//configuracion de la sesion
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nicolasfranchini:9MSz65DpCU@ch-backend-ecommerce.ex9a7cc.mongodb.net/sessionsdb?retryWrites=true&w=majority",
    }),
    secret: "claveSecreta", //clave de encriptacion de la sesion

    //config para guardar en la memoria del servidor
    resave: false,
    saveUninitialized: false,
  })
);

// configuración de passport
app.use(passport.initialize()); //Conectamos a passport con express.
app.use(passport.session()); //Vinculamos passport y las sesiones de nuestros usuarios.

//Serializar un usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Deserializar un usuario
passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, userFound) => {
    if (err) return done(err);
    return done(null, userFound);
  });
});

//Estrategia de registro utilizando passport local
passport.use(
  "signupStrategy",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    (req, username, password, done) => {
      //Logica para registrar al usuario
      //Verificar si el usuario existe en db
      UserModel.findOne({ username: username }, (err, userFound) => {
        if (err) return done(err, null, { message: `Hubo un error: ${err}` });
        if (userFound)
          return done(null, null, { message: "El usuario ya existe" });
        // Guardamos el usuario en la db
        const newUser = {
          name: req.body.name,
          username: username,
          password: password,
        };
        UserModel.create(newUser, (err, userCreated) => {
          if (err)
            return done(err, null, {
              message: "Hubo un error al registrar el usuario",
            });
          return done(null, userCreated);
        });
      });
    }
  )
);

//middleware para validar la sesion del usuario
// const checkSession = (req, res, next) => {
//   //validamos si la sesion esta activa
//   if (req.session.user) {
//     res.redirect("/perfil");
//   } else {
//     next();
//   }
// };

//crear una funcion para encriptar la contrase;
// estaesmiPass => ahjsgduyqwte234296124ahsd-hash
const createHash = (password) => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hash;
};

// Strategy para login a través de twitter
passport.use(
  "twitterLogin",
  new TwitterStrategy(
    {
      consumerKey: "bjXaghAMNLIGjDRsMQT9AVmKs",
      consumerSecret: "23jzQnACakKXPvhQAVvSyVx7f7Sh0dj6mZ0gbPcVXL0mStYEmM",
      callbackURL: "http://localhost:8080/auth/twitter/callback",
    },
    (token, accessToken, profile, done) => {
      console.log("profile", profile);
      UserModel.findOne({ username: profile.username }, (err, userFound) => {
        if (err) return done(err, null, { message: `Hubo un error: ${err}` });
        if (userFound) return done(null, userFound);
        // Guardamos el usuario en la db
        const newUser = {
          name: profile.displayName,
          username: profile.username,
          password: profile.id,
        };
        UserModel.create(newUser, (err, userCreated) => {
          if (err)
            return done(err, null, {
              message: "Hubo un error al registrar el usuario",
            });
          return done(null, userCreated);
        });
      });
    }
  )
);

//rutas asociadas a las paginas del sitio web
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/registro", (req, res) => {
  res.render("signup");
});

app.get("/inicio-sesion", (req, res) => {
  res.render("login");
});

app.get("/perfil", (req, res) => {
  res.render("profile");
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.render("profile");
  } else {
    res.send(
      "<div>Debes <a href'/inicio-sesion'>inciar sesion</a> o <a href='/registro'>registrarte</a></div>"
    );
  }
});

//rutas de autenticacion
app.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/registro",
    failureMessage: true, //req.sessions.messages
  }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

app.post("/login", (req, res) => {
  const user = req.body;
  //el usuario existe
  const userExists = users.find((elm) => elm.email === user.email);
  if (userExists) {
    //validar la contrase;a
    if (userExists.password === user.password) {
      req.session.user = user;
      res.redirect("/perfil");
    } else {
      res.redirect("/inicio-sesion");
    }
  } else {
    res.redirect("/registro");
  }
});

app.get("/login-twitter", passport.authenticate("twitterLogin"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitterLogin", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send("hubo un error al cerrar sesion");
    req.session.destroy();
    res.redirect("/");
  });
});
