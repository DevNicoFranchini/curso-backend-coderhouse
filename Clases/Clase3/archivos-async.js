const fs = require("fs");

// Escribir un archivo
fs.writeFile("./archivo-async.txt", "Primer texto asíncrono", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("El archivo se creó correctamente");
  }
});

// Leer archivo
fs.readFile("./archivo-async.txt", "utf-8", (error, contenido) => {
  if (error) {
    console.log(error);
  } else {
    console.log(contenido);
  }
});

// Eliminar el archivo
fs.unlink("./archivo-async.txt", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("El archivo se eliminó correctamente");
  }
});
