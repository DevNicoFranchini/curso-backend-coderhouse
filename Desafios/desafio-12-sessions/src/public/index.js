console.log("JS Funcionando");

// Inicializo desde el lado cliente
const socketClient = io();

socketClient.on("productos", async (data) => {
  const productsContainer = document.getElementById("productos");
});

// Schemas
const authorSchema = new normalizr.schema.Entity("authors");
const msgSchema = new normalizr.schema.Entity("mensajes", {
  author: authorSchema,
});
const chatSchema = new normalizr.schema.Entity(
  "chat",
  {
    mensajes: [msgSchema],
  },
  { idAttribute: "id" }
);

// Mensajería
const inputUsername = document.getElementById("inputUsername");
const inputName = document.getElementById("inputName");
const inputLastName = document.getElementById("inputLastName");
const inputAge = document.getElementById("inputAge");
const inputAlias = document.getElementById("inputAlias");
const inputAvatar = document.getElementById("inputAvatar");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");
const compresion = document.getElementById("compresion");
const formPublicarMensaje = document.getElementById("formPublicarMensaje");

formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = {
    author: {
      id: inputUsername.value,
      nombre: inputName.value,
      apellido: inputLastName.value,
      edad: inputAge.value,
      alias: inputAlias.value,
      avatar: inputAvatar.value,
    },
    text: inputMensaje.value,
  };
  // console.log(mensaje);
  socketClient.emit("nuevoMensaje", mensaje);
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socketClient.on("mensajes", async (mensajes) => {
  console.log("normal", mensajes);
  const normalData = normalizr.denormalize(
    mensajes.result,
    chatSchema,
    mensajes.entities
  );
  let listaMensajes = "";

  normalData.mensajes.forEach((mensaje) => {
    listaMensajes += `
    <div>
        <b style="color:blue;">${mensaje.author.nombre}</b>
        [<span style="color:brown;">${mensaje.fyh}</span>] :
        <i style="color:green;">${mensaje.text}</i>
    </div>
`;
  });
  const chatContainer = document.getElementById("mensajes");
  chatContainer.innerHTML = listaMensajes;

  // Porcentaje de compresión
  compresion.innerHTML = `Porcentaje de compresión: ${(
    (JSON.stringify(normalData).length / JSON.stringify(mensajes).length) *
    100
  ).toPrecision(2)}%`;
});

inputUsername.addEventListener("input", () => {
  const hayEmail = inputUsername.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});
