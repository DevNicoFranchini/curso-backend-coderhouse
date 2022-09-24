const fs = require("fs");

// Crear un archivo
//fs.writeFileSync("./archivo.txt", "primer texto");

// Leer un archivo
// const content = fs.readFileSync("./archivo.txt", "utf-8");
// console.log(content);

// Agregar contenido
//fs.appendFileSync("./archivo.txt", "\nInfo adicional");

//Eliminar el archivo
//fs.unlinkSync("./archivo.txt");

try {
  fs.unlinkSync("./archivo.doc");
} catch (error) {
  console.log(error);
}
console.log("Otras instrucciones");
