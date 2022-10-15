const express = require("express");
const app = express();
app.listen(8080, () => console.log("Servidor funcionando"));

app.use(express.static("public"));



