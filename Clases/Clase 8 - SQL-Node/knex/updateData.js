import { options } from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database
  .from("cars")
  .where("id", 5)
  .update({ price: 2000 })
  .then((data) => {
    console.log("updated successfully");
  })
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
