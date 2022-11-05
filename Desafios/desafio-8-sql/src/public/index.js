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

function makeHtmlTable(productos) {
  return fetch("views/productsTable.hbs")
    .then((rsp) => rsp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

// Mensajería
const inputUsername = document.getElementById("inputUsername");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = { autor: inputUsername.value, texto: inputMensaje.value };
  socketClient.emit("nuevoMensaje", mensaje);
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socketClient.on("mensajes", (mensajes) => {
  console.log(mensajes);
  const html = makeHtmlList(mensajes);
  document.getElementById("mensajes").innerHTML = html;
});

function makeHtmlList(mensajes) {
  return mensajes
    .map((mensaje) => {
      return `
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `;
    })
    .join(" ");
}

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
