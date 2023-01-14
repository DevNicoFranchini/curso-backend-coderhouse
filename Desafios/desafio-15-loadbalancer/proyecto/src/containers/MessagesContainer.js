const { promises: fs } = require("fs");

class MessagesContainer {
  constructor(route) {
    this.route = route;
  }

  async getAll() {
    try {
      const objs = await fs.readFile(this.route, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async save(obj) {
    const objs = await this.getAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { id: newId, ...obj  };
    objs.push(newObj);

    try {
      await fs.writeFile(this.route, JSON.stringify(objs, null, 2));
      return newId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}

module.exports = MessagesContainer;
