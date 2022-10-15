const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.listen(8080, () => console.log("Servidor funcionando"));

// Configurar motor de plantillas

// 1. Definir el motor de plantillas
//          extensión       ejecutar el motor
app.engine("handlebars", handlebars.engine());

// 2. Ubicar la carpeta donde coloco los templates de ext. hbs
app.set("views", "./views");

// 3. Definir el motor para express
app.set("view engine", "handlebars");

// 4. RUTAS
app.get("/", (req, res)=>{
    res.render("home")
})
