class Usuario {
  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  }

  // Función que retorna el nombre completo del usuario.
  getFullName() {
    return `El nombre completo es: ${this.name} ${this.surname}`;
  }

  // Función que agrega una mascota al array.
  addPet(petName) {
    const newPet = petName;
    this.pets.push(newPet);
  }

  // Función que retorna la cantidad de mascotas del usuario.
  countPets() {
    return this.pets.length;
  }

  // Función que agrega un libro al array.
  addBook(autor, libro) {
    const newBook = { autor: autor, libro: libro };
    this.books.push(newBook);
  }

  // Función que retorna un array con los nombres de los libros.
  getBookNames() {
    const bookNames = this.books.map((book) => book.libro);
    return bookNames;
  }
}

const usuario1 = new Usuario(
  "Nico",
  "Franchi",
  [
    { autor: "Pepe", libro: "Pepito" },
    { autor: "SK", libro: "it" },
  ],
  ["Berny", "Tarzu"]
);

// Pruebas

// Usuario inicial
console.log(usuario1);

// Nombre completo del usuario
console.log(usuario1.getFullName());

// Se agrega una mascota
usuario1.addPet("Michi");

// Usuario con nueva mascota
console.log(usuario1);

// Conteo de mascotas
console.log(usuario1.countPets());

// Se agrega un libro
usuario1.addBook("Jorgeee", "Jorgiiito");

// Usuario con nuevo libro
console.log(usuario1);

// Se obtiene nombres de libros
console.log(usuario1.getBookNames());
