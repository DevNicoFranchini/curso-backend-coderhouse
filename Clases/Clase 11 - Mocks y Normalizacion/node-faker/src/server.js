import express from "express";
import { userRouter } from "./routes/users.js";

const app = express();

app.listen(8080, () => console.log("Server running"));

app.use("/api/usuarios", userRouter);







