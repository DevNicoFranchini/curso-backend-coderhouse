console.log("JS Funcionando");

const socketClient = io();

let user;

Swal.fire({
  title: "Hola usuario",
  text: "Bienvenido, ingresa tu usuario",
  input: "text",
  allowOutsideClick: false,
}).then((rsp) => {
  //console.log(rsp);
  user = rsp.value;
  //console.log(user);
});
01;
const campo = document.getElementById("msgField");

campo.addEventListener("keydown", (evt) => {
  //console.log(evt.key);
  if (evt.key === "Enter") {
    socketClient.emit("msg", {
      username: user,
      message: campo.value,
    });
  }
});

const msgCampo = document.getElementById("msgContainer");

socketClient.on("historico", (data) => {
  //console.log(data);
  let elementos = "";
  data.forEach((item) => {
    elementos += `<p><strong>${item.username}</strong>: ${item.message}</p>`;
  });
  msgCampo.innerHTML = elementos;
});

socketClient.on("newUser", () => {
  Swal.fire({
    text: "Nuevo usuario conectado",
    toast: true,
  });
});
