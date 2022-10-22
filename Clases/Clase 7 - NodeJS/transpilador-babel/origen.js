class User {
  constructor(name) {
    this.name = name;
    this.surname = surname;
  }

  getName() {
    return `${this.name} ${this.surname}`;
  }
}

const usuario1 = new User("Nicolas", "Franchini");
