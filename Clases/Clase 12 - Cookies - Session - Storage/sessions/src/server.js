import express from "express";
import session from "express-session";

const app = express();

app.listen(8080, () => console.log("Servidor en puerto 8080"));

app.use(
  session({
    // Encriptar la información
    secret: "clave",

    // Indicamos donde se va a guardar la sesión - memoria del servidor
    resave: true,
    saveUninitialized: true,

    // Definir parámetros de la cookie, por la cual viaja la sessionId
    cookie: {
      maxAge: 10000,
    },
  })
);

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

app.get("/perfil", (req, res) => {
  //console.log(req.session);
  if (req.session.username) {
    res.send(`Bienvenido ${req.session.username}`);
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Sesion finalizada");
});
