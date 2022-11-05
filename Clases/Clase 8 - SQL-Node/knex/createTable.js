import { options } from "./options/mysqlconfig.js";
import knex from "knex";

// Creamos instancia de la db
const database = knex(options);

// CREATE TABLE nombre
database.schema
  .createTable("cars", (table) => {
    table.increments("id"); //AUTO_INCREMENT NOT NULL PRIMARY KEY
    table.string("name", 20); //name VARCHAR(20)
    table.integer("price"); // price INT
  })
  .then(() => console.log("Table created"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy()); // CERRAR LA SESIÓN.

  
