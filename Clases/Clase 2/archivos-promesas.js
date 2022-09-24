const fs = require("fs");

// Leer archivo con promesas.
fs.promises
  .readFile("./archivo.txt", "utf-8")
  .then((contenido) => {
    return contenido;
  })
  .then((nuevoContenido) => {
    return fs.promises.writeFile("./nuevoArchivo.txt", nuevoContenido);
  })
  .then((segundoResultado) => {
    console.log("Copia realizada con exito");
  });
