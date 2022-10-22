class Contenedor {
  constructor() {
    this.elements = [];
    this.id = 0;
  }

  getAll() {
    return [...this.elements];
  }

  save(elm) {
    const newElm = { ...elm, id: ++this.id };
    this.elements.push(newElm);
    return newElm;
  }
}
module.exports = Contenedor;
