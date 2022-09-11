class Contador {
  constructor(nombre) {
    this.nombre = nombre;
    this.contadorIndividual = 0;
  }

  // Static: crea variables únicamente de la clase pero las puedo compartir a través de todos los objetos.
  // Propiedad de la clase. Es compartida por todos los objetos
  static contadorGlobal = 0;

  obtenerResponsable() {
    return this.nombre;
  }

  obtenerCuentaIndividual() {
    return this.contadorIndividual;
  }

  obtenerCuentaGlobal() {
    return Contador.contadorGlobal;
  }

  contar() {
    this.contadorIndividual++;
    Contador.contadorGlobal++;
  }
}

const contadorNico = new Contador("Nico");
console.log("Nico", contadorNico);
const contadorJuan = new Contador("Juan");
console.log("Juan", contadorJuan);

console.log(contadorNico.obtenerResponsable());
console.log(contadorNico.obtenerCuentaIndividual());
console.log(contadorNico.obtenerCuentaGlobal());

contadorNico.contar();
contadorJuan.contar();

console.log(contadorNico.obtenerCuentaIndividual());
console.log(contadorJuan.obtenerCuentaIndividual());
console.log(contadorNico.obtenerCuentaGlobal());
