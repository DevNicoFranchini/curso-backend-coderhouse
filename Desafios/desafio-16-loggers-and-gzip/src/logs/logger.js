const log4js = require("log4js");

//Configuracion de log4js

log4js.configure({
  appenders: {
    // Definir las salidas de datos
    consola: { type: "console" },
    archivoErrores: { type: "file", filename: "./src/logs/messages/error.log" },
    archivoWarning: { type: "file", filename: "./src/logs/messages/warn.log" },

    // Salidas con niveles definidos
    loggerConsola: {
      type: "logLevelFilter",
      appender: "consola",
      level: "info",
    },
    loggerErrores: {
      type: "logLevelFilter",
      appender: "archivoErrores",
      level: "error",
    },
    loggerWarning: {
      type: "logLevelFilter",
      appender: "archivoWarning",
      level: "warn",
    },
  },
  categories: {
    default: {
      appenders: ["loggerConsola", "loggerErrores", "loggerWarning"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger();

export { logger };
