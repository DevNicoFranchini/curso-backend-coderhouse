const express = require("express");

const router = require("./src/routes/index.js");
const config = require("./config.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// En el caso de tener archivos estáticos en la carpeta public.
//app.use(express.static(__dirname + "/public/"));

if (config.hbs) {
  const handlebars = require("express-handlebars");
  app.engine("hbs", handlebars.engine({ extname: "hbs" }));
  app.set("views", "./src/views/hbs");
  app.set("view engine", "hbs");
} else if (config.pug) {
  app.set("views", "./src/views/pug");
  app.set("view engine", "pug");
} else if (config.ejs) {
  app.set("views", "./src/views/ejs");
  app.set("view engine", "ejs");
}

app.listen(8080, () =>
  console.log("Ivan, el servidor está ejecutándose en el puerto 8080")
);
