import express from "express";
import log4js from "log4js";

const app = express();

log4js.configure({
  appenders: {
    consola: { type: "console" },
    // Definimos la salida de datos: terminal, archivos, bbdd.
    archivo: { type: "file", filename: "./src/logs/demostracion.txt" },
  },
  categories: {
    default: { appenders: ["consola", "archivo"], level: "trace" },
  },
});

// Instancia de log4js
const logger = log4js.getLogger(); // Instancia de la categoría default.

logger.trace("Imprimieendo mensaje de nivel trace");
logger.debug("mensaje de nivel debug");
logger.info("mensaje de nivel info");
logger.warn("mensaje de nivel warn");
logger.error("mensaje de nivel error");
logger.fatal("mensaje de nivel fatal");

const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening on port ${8080}`));
