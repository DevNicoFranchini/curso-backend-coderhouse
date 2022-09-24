setTimeout(() => {
  console.log("Ya pasaron 2 segundos");
}, 2000);

let i = 0;
const intervalo = setInterval(() => {
  console.log("Ya pasó 1 segundo");
  i++;
  if (i == 10) {
    clearInterval(intervalo);
  }
}, 1000);
