console.log("Soy un archivo js");

// Inicializar websocket del lado del front
const socketCliente = io();

// Recibir el mensaje desde el servidor.
socketCliente.on("messageFromServer", (data) => {
  console.log(data);
});

const messageField = document.getElementById("messageField");
messageField.addEventListener("keydown", (evt) => {
  //console.log(evt.key);
  socketCliente.emit("letras", evt.key);
});

socketCliente.on("messages", (msj) => {
  console.log(msj);
});
