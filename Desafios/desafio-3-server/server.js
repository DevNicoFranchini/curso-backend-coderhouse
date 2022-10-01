const express = require("express");
const Contenedor = require("./contenedor.js");

const products = new Contenedor("./productos.txt");

// Creo un servidor utilizando express
const app = express();

// Configuro las rutas
app.get("/", (req, res) => {
  res.send(`<h1>Hola tutor, el servidor esta funcionando</h1>`);
});

// Ruta de productos
app.get("/productos", async (req, res) => {
  const getProducts = await products.getAll();
  res.send(getProducts);
});

// Ruta para recuperar un producto al azar
app.get("/producto/random", async (req, res) => {
  const getProduct = await products.getAll();
  const productRandom =
    getProduct[Math.floor(Math.random() * getProduct.length)];
  res.send(productRandom);
});

// Ejecuto el servidor
app.listen(8080, () => {
  console.log("El servidor se esta ejecutado en el puerto 8080");
});
