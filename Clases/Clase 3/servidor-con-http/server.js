const http = require("http");

// Creamos el servidor
const server = http.createServer((request, response) => {
  console.log("El cliente solicito algo");
  response.end("Hola, recibi tu petición");
});

// Levanta el server
server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
