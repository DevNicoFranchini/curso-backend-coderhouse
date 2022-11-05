import { options } from "./options/desafioConfig.js";
import knex from "knex";

const database = knex(options);

const articulosArray = [
  { nombre: "libro", codigo: "2300", precio: 1000, stock: 10 },
  { nombre: "libreta", codigo: "9000", precio: 1000, stock: 10 },
  { nombre: "esfero", codigo: "1000", precio: 1000, stock: 10 },
  { nombre: "lapiz", codigo: "6450", precio: 1000, stock: 10 },
  { nombre: "goma", codigo: "5000", precio: 1000, stock: 10 },
  { nombre: "regla", codigo: "3000", precio: 1000, stock: 10 },
];

const operationsDb = async () => {
  //Validar si existe la tabla
  const tableExists = await database.schema.hasTable("articulos");
  if (tableExists) {
    await database.schema.dropTable("articulos");
  }
  await database.schema.createTable("articulos", (table) => {
    table.increments("id");
    table.string("nombre", 15).nullable(false);
    table.string("codigo", 15).nullable(false);
    table.float("precio");
    table.integer("stock");
  });

  await database("articulos").insert(articulosArray);
  database.destroy();
};

operationsDb();
