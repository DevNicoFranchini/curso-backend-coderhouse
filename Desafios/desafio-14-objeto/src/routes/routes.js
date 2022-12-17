const express = require("express");
const faker = require("faker");

const { datatype, commerce, image } = faker;

// const ProductsContainer = require("./../containers/ProductsContainer.js");

const router = express.Router();

// const productsContainer = new ProductsContainer("productos.txt");

faker.locale = "es";

router.get("/", (req, res) => {
  try {
    // const products = await productsContainer.getAll();
    let products = [];

    for (let i = 0; i < 5; i++) {
      products.push({
        id: datatype.uuid(),
        title: commerce.productName(),
        price: commerce.price(),
        thumbnail: image.image(),
      });
    }

    // console.log(products);
    res.render("products", { products: products });
  } catch (error) {
    res.status(500).send("Se produjo un error en el servidor :(");
  }
});

module.exports = router;
