// 1. Posibles fallas o posibles validaciones

// Que la función sumar sea un método dentro de una clase
// Que el método sumar lo pueda ejecutar sin instanciar la clase.
// Que el método sumar reciba dos parámetros.
// Que los parámetros sean de tipo numérico.
// Que la suma se realice correctamente.

class Calculadora {
  static sumar(a, b) {
    // Static es para poder usar el método sin instanciar la clase.
    if (!a || !b) return console.log("Debes pasar dos argumentos");
    if (!Number.isFinite(a))
      return console.log("El primer argumento debe ser un numero entero");
    if (!Number.isFinite(b))
      return console.log("El segundo argumento debe ser un numero entero");
    console.log(a + b);
  }
}

Calculadora.sumar(2, 10.5);
