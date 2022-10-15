const express = require("express");
const app = express();

app.listen(8080, () => console.log("Server running"));

app.use((req, res, next) => {
  console.log("Procesando antes de la petición");
  next();
});

const verificarRol = (req, res, next) => {
  const rol = "admin";
  if (rol === "admin") {
    next();
  } else {
    res.send("No tienes acceso a esta ruta");
  }
};

app.get("/", (req, res) => {
  console.log("Ejecutando ruta /");
  res.send("Peticion recibida");
});

app.get("/home", (req, res) => {
  console.log("Ejecutando ruta /home");
  res.send("Peticion recibida en ruta home");
});

app.get("/users", verificarRol, (req, res) => {
  res.send("Lista de usuarios");
});
