import { options } from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

const cars = [
  { name: "Volvo", price: 2300 },
  { name: "Audi", price: 9000 },
  { name: "Toyota", price: 1000 },
  { name: "Mercedez", price: 6450 },
  { name: "Porsche", price: 5000 },
  { name: "Ford", price: 3000 },
];

// INSERT
database("cars")
  .insert(cars)
  .then(() => console.log("data added"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
