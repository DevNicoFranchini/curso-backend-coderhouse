// Llamo a express
const { response } = require("express");
const express = require("express");

// Inicializo app
const app = express();

// Configuración para recibir e interpretar JSON's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Metodo estático
app.use("/archivos", express.static("public"));

// Llamo al servidor
app.listen(8080, () =>
  console.log("El servidor está siendo escuchado en el puerto 8080")
);

const fruits = [
  { id: 1, name: "pera", price: 200 },
  { id: 2, name: "manzana", price: 100 },
  { id: 3, name: "sandia", price: 300 },
];

// Creo rutas
//GET
app.get("/fruits", (req, res) => {
  if (Object.keys(req.query).length > 0) {
    //console.log("El request es: ", req.query);
    const { name } = req.query;
    const newFruit = fruits.filter((elm) => elm.name === name);
    res.send(newFruit);
  } else {
    res.send(fruits);
  }
});

// Ruta url params o parametros de identificación --> Cuando sabemos cómo está guardado un elemento en el sistema
app.get("/fruits/:id", (req, res) => {
  const { id } = req.params;
  const product = fruits.find((elm) => elm.id === parseInt(id));
  res.send(product);
});

//POST
app.post("/fruits", (req, res) => {
  console.log(req.body);
  res.send("Peticion recibida");
});
