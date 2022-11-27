console.log("JS Funcionando");

// Inicializo desde el lado cliente
const socketClient = io();

// Agregar producto
const enviarProducto = document.getElementById("enviarProducto");
enviarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    title: enviarProducto[0].value,
    price: enviarProducto[1].value,
    thumbnail: enviarProducto[2].value,
  };
  socketClient.emit("update", producto);
  enviarProducto.reset();
});

socketClient.on("productos", (productos) => {
  makeHtmlTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

const makeHtmlTable = (productos) => {
  return fetch("views/productsTable.hbs")
    .then((rsp) => rsp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
};

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

  // console.log(JSON.stringify(normalData).length);
  // console.log(JSON.stringify(mensajes).length);

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
