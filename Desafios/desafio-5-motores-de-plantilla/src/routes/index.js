const express = require("express");
const Contenedor = require("../services/contenedor");

const router = express.Router();

// Creo un nuevo contenedor
const contenedorProductos = new Contenedor("productos.txt");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/api/productos", async (req, res) => {
  try {
    const products = await contenedorProductos.getAll();
    //console.log(products);
    res.render("products", { products: products });
  } catch (error) {
    res.status(500).send("Se produjo un error en el servidor :(");
  }
});

router.get("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  const product = await contenedorProductos.getById(parseInt(id));
  if (product) {
    res.render("product", { product: product });
  } else {
    res.json({
      message: "El producto no pudo ser hallado :(",
    });
  }
});

router.post("/api/productos", async (req, res) => {
  const newProduct = req.body;
  const product = await contenedorProductos.save(newProduct);
  if (product) {
    res.redirect("/api/productos");
  } else {
    res.json({
      message: "El producto no pudo ser creado, valide campos :(",
    });
  }
});

module.exports = router;
