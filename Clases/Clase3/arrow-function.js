// Las funciones también son objetos.

function sumar(a, b) {
  console.log(a + b);
}

const resultado = sumar(2, 6);
console.log(resultado); // dará undefined porque la función no tiene return.

// Con return
function sumar2(a, b) {
  return a + b;
}

const resultado2 = sumar2(2, 6);
console.log("El resultado es: ", resultado2);

// Arrow function
const sumar3 = (num1, num2) => {
  const numero1 = num1 * 2;
  const numero2 = num2 * 2;
  return numero1 + numero2;
};

const resultado3 = sumar3(298, 3493);
console.log("El resultado 3 es: ", resultado3);

// Arrow function con un solo parametro
const multiplicar = (num1) => {
  return num1 * 2;
};
const resultado4 = multiplicar(298);
console.log(resultado4);

// Arrow function con una sola linea
const division = (num1) => num1 / 2;
const resultado5 = division(10);
console.log(resultado5);