import { options } from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database
  .from("cars")
  .where("id", 4)
  .del()
  .then((data) => {
    console.log("deleted successfully");
  })
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
