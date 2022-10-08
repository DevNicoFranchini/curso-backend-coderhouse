const express = require("express");
const productsRouter = require("./routes/products");

const app = express();

app.listen(8080, () =>
  console.log("Tutor, el servidor está siendo escuchado en el puerto 8080")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter);
