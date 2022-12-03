import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileStrategy from "session-file-store";

const app = express();

app.listen(8080, () => console.log("Server on 8080"));

app.use(cookieParser());

const FileStore = fileStrategy(session); // Vincular el storage con las sesiones

app.use(
  session({
    store: new FileStore({
      path: "./src/sessions",
      ttl: 20, // En segundos
    }),

    secret: "clave",
    resave: false,
    saveUninitialized: false,
  })
);

