// Estados: pendiente, cumplida, rechazada
// States: pending, fulfilled, rejected

/* const division = (dividendo, divisor) => {};

const promesa = new Promise((resolve, reject) => {
  let condition = false;
  if (condition === true) {
    resolve("La operación ha sido completada con éxito");
  } else {
    reject("Hubo un fallo en el servidor");
  }
});

promesa
  .then((resultado) => console.log(resultado))
  .catch((rechazado) => console.log(rechazado)); */

/* const multiplicar = (num1, num2) => {
  return new Promise((res, rej) => {
    if (num2 === 0) {
      rej("No puede multiplicar por cero");
    } else {
      res(num1 * num2);
    }
  });
};

const division = (num1, divisor) => {
  return new Promise((res, rej) => {
    if (divisor === 0) {
      rej("No puede dividir por cero");
    } else {
      res(num1 / divisor);
    }
  });
};

division(10, 0)
  .then((resultado) => {
    console.log(resultado);
    return resultado;
  })
  .then((value) => {
    return multiplicar(value, 100);
  })
  .then((resultado2) => console.log(resultado2))
  .catch((error) => console.log(error))
  .finally(() => console.log("El proceso terminó")); */

Promise.resolve(20)
  .then((x) => x + 1)
  .then((x) => x * 2)
  .then((x) => {
    if (x == 22) throw "Error";
    else return 80;
  })
  .then(console.log)
  .then((x) => 30)
  .then((x) => x / 2)
  .then(console.log)
  .catch(console.log);
