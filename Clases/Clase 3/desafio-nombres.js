const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 654 },
  { id: 3, nombre: "Lapiz", precio: 10 },
  { id: 4, nombre: "Lapicera", precio: 357 },
  { id: 5, nombre: "Goma", precio: 14 },
  { id: 6, nombre: "Regla", precio: 2 },
];

// A) Los nombres de los productos en un sting separados por comas.
// const numeros = [1, 2, 3];
// const numerosPor2 = numeros.map((item) => item * 2);

// console.log(numeros);
// console.log(numerosPor2);

// const nombres = productos.map((producto) => producto.nombre);
// console.log(nombres);
// const nombresProductos = nombres.join(", ");
// console.log(nombresProductos);

// B) El precio total
const total = productos.reduce((acc, curr) => acc + curr.precio, 0);
// console.log("El precio total es: ", total);

// C) El precio promedio
const promedio = total / productos.length;
console.log(promedio);

// D) Menor precio

// E) Mayor precio
const productosAsc = productos.sort((a, b) => (a.precio > b.precio ? 1 : -1));
const min = productosAsc[0];
const max = productosAsc[productosAsc.length - 1];

console.log(min);
console.log(max);

const resultados = {
    nombre
}