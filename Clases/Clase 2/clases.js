class Perro {
  constructor(name, age, raza) {
    this.name = name;
    this.age = age;
    this.raza = raza;
  }
}

const perroTarzu = new Perro("Tarzan", 7, "Labrador");

console.log(perroTarzu);

const perroPepe = new Perro("Pepe", 90, "Beagle"); //Instancia de la clase
console.log(perroPepe);
