// Un callback es una función que se envía como argumento a otra función.

// El callback siempre es el último parámetro.
// El callback suele recibir 2 parámetros.


const sumar = (num1, num2) => num1 + num2;
const multiplicar = (num1, num2) => num1 * num2;

const funcionPrincipal = (numero1, numero2, callback) => {
  // Otro código
  return callback(numero1, numero2);
};

console.log(funcionPrincipal(2, 4, sumar));
console.log(funcionPrincipal(2, 4, multiplicar));

// Callback para procesos pesados o complejos

const notificacion = () => console.log("El proceso ya termino");

const funcionCompleja = (callback) => {
  // Ejecutando muchas operaciones
  setTimeout(() => {
    callback();
  }, 5000);
};

console.log(funcionCompleja(notificacion));

function escribirYLoguear(texto, callbackParaLoguear) {
  // simulamos que escribimos en un archivo!
  console.log(texto);
  // al finalizar, ejecutamos el callback
  callbackParaLoguear("archivo escrito con éxito");
}

escribirYLoguear("hola mundo de los callbacks!", (mensajeParaLoguear) => {
  const fecha = new Date().toLocaleDateString();
  console.log(`${fecha}: ${mensajeParaLoguear}`);
});
