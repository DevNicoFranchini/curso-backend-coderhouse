const path = require("path");

const options = {
  mariaDB: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "desafio8db",
    },
  },

  sqliteDB: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../db/ecommerce.sqlite"),
    },
  },
};

module.exports = options;
