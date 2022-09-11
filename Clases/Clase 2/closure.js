// const ahorrosBanco = (abono) => {
//   let ahorros = 0;
//   ahorros += abono;
//   console.log(ahorros);
// };

// ahorrosBanco(500);
// ahorrosBanco(500);
// ahorrosBanco(500);

const ahorrosBanco = () => {
  let ahorros = 0;
  return function (abono) {
    ahorros += abono;
    console.log(ahorros);
  };
};

let ahorrosNico = ahorrosBanco();
let ahorrosPepe = ahorrosBanco();

ahorrosNico(500);
ahorrosNico(500);

ahorrosPepe(50000000000);
ahorrosNico(10);
