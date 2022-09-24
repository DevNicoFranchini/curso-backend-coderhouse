function sumar(/* Parámetros */ num1, num2) {
  //   console.log(num1 + num2);
  return num1 + num2;
}

const resultado = sumar(3, 5);
// sumar(105, 370);

console.log(resultado);

// Arrow function
const restar = (num1, num2) => {
  return num1 - num2;
};

const resultado2 = restar(80, 50);
console.log(resultado2);
