const knex = require("knex");

class MysqlContainer {
  constructor(options, dbname) {
    this.database = knex(options);
    this.dbname = dbname;
  }

  async getAll() {
    try {
      const data = await this.database.from(this.dbname).select("*");
      const results = data.map((elm) => ({ ...elm }));
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  async save(newData) {
    try {
      const [id] = await this.database.from(this.dbname).insert(newData);
      return `New element saved with id: ${id}`;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MysqlContainer;
