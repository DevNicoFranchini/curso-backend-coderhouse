import express from "express";
import compression from "compression";

const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log(`Server on ${PORT}`));

// app.use(compression());

app.get("/saludo", (req, res) => {
  res.send("Hola que tal ".repeat(1000));
});

app.get("/saludoZip", compression(), (req, res) => {
  res.send("Hola que tal ".repeat(1000));
});
