const express = require("express");
const productsRouter = express.Router();

const Contenedor = require("../contenedor");

// Creo un nuevo contenedor
const contenedorProductos = new Contenedor("productos.txt");

productsRouter.get("/", async (req, res) => {
  try {
    const products = await contenedorProductos.getAll();
    console.log(products);
    res.send(products);
  } catch (error) {
    res.status(500).send("Se produjo un error en el servidor :(");
  }
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await contenedorProductos.getById(parseInt(id));
  if (product) {
    res.json({
      message: "El producto fue hallado correctamente :)",
      product: product,
    });
  } else {
    res.json({
      message: "El producto no pudo ser hallado :(",
    });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  const productos = await contenedorProductos.save(newProduct);
  res.json({
    message: "¡El producto fue creado correctamente!",
    response: productos,
  });
});

productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const productosActualizados = await contenedorProductos.updateById(
    parseInt(id),
    newInfo
  );
  res.json({
    message: `El producto correspondiente al id ${id} fue actualizado correctamente :)`,
    response: productosActualizados,
  });
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await contenedorProductos.getById(parseInt(id));
  const newInfo = req.body;
  const productosActualizados = await contenedorProductos.deleteById(
    parseInt(id),
    newInfo
  );
  if (product) {
    res.json({
      message: `El producto correspondiente al id ${id} fue eliminado correctamente :)`,
      response: productosActualizados,
    });
  } else {
    res.json({
      message: "El producto no existe :(",
    });
  }
});

productsRouter.get("/home", (req, res) => {
  res.send("Peticion home");
});

module.exports = productsRouter;
