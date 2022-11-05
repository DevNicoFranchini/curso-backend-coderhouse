const options = require("./../config/dbConfig");
const knex = require("knex");

// Instanciamos la db
const dbmysql = knex(options.mariaDB);
const dbsqlite = knex(options.sqliteDB);

const createTable = async () => {
  try {
    // Verificamos existencia de la db
    const productsExists = await dbmysql.schema.hasTable("productos");
    if (productsExists) {
      await dbmysql.schema.dropTable("productos");
    }

    // Creamos db
    await dbmysql.schema.createTable("productos", (table) => {
      table.increments("id");
      table.string("title", 20).nullable(false);
      table.integer("price").nullable(false);
      table.string("thumbnail", 100).nullable(false);
    });

    console.log("DB Created successfully");

    dbmysql.destroy();

    const chatExists = await dbsqlite.schema.hasTable("messages");
    if (chatExists) {
      await dbsqlite.schema.dropTable("messages");
    }

    // Creamos db
    await dbsqlite.schema.createTable("messages", (table) => {
      table.increments("id");
      table.string("autor", 20);
      table.string("texto", 200);
      table.string("fyh", 15);
    });
    console.log("Messages DB created");
    dbsqlite.destroy();
  } catch (err) {
    console.log(err);
  }
};

createTable();
