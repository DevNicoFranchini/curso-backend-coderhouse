const express = require("express");

// Crear el servidor
const app = express();

// Configurar las rutas
app.get("/", (req, res) => {
  res.send("Hola desde express");
});

app.get("/otra", (req, res) => {
  res.send("Hola desde otra ruta");
});

// Levantar el servidor
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
