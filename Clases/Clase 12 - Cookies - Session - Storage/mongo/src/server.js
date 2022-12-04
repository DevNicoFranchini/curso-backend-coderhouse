import express from "express";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.listen(8080, () => console.log("Server on 8080"));

app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "",
    }),
    secret: "clave",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 20000,
    },
  })
);

const checkUserLogged = (req, res, next) => {
  if (user) {
    req.session.username = user;
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/login", (req, res) => {
  const { user } = req.query;
  if (req.session.username) {
    res.redirect("/perfil");
  } else {
    if (user) {
      req.session.username = user;
      res.send("Sesion iniciada");
    } else {
      res.send("Ingresar usuario");
    }
  }
});

app.get("/perfil", checkUserLogged, (req, res) => {
  res.send(`Bienvenido ${req.session.username}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Sesion finalizada");
});
