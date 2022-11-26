import mongoose from "mongoose";

// Definir la colección
const userCollection = "users";

// Definir el esquema
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
});

// Generamos el modelo
export const userModel = mongoose.model(userCollection, userSchema);
