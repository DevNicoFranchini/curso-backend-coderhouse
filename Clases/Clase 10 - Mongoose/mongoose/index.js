import mongoose from "mongoose";

import { studentModel } from "./models/student.js";

// La URL donde se está ejecutando nuestra base de datos
const URL = "mongodb://127.0.0.1:27017/colegio";

// Conectamos a la base de datos
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw new Error(`Conexion fallida ${error}`);
    console.log("Conexión bd exitosa");
  }
);

const operacionesCRUD = async () => {
  try {
    const newStudents = [
      {
        nombre: "Pedro",
        apellido: "Mei",
        edad: 21,
        dni: "31155898",
        curso: "1A",
        nota: 7,
      },
      {
        nombre: "Ana",
        apellido: "Gonzalez",
        edad: 32,
        dni: "27651878",
        curso: "1A",
        nota: 8,
      },
      {
        nombre: "José",
        apellido: "Picos",
        edad: 29,
        dni: "34554398",
        curso: "2A",
        nota: 6,
      },
      {
        nombre: "Lucas",
        apellido: "Blanco",
        edad: 22,
        dni: "30355874",
        curso: "3A",
        nota: 10,
      },
      {
        nombre: "María",
        apellido: "García",
        edad: 36,
        dni: "29575148",
        curso: "1A",
        nota: 9,
      },
      {
        nombre: "Federico",
        apellido: "Perez",
        edad: 41,
        dni: "320118321",
        curso: "2A",
        nota: 5,
      },
      {
        nombre: "Tomas",
        apellido: "Sierra",
        edad: 19,
        dni: "38654790",
        curso: "2B",
        nota: 4,
      },
      {
        nombre: "Carlos",
        apellido: "Fernández",
        edad: 33,
        dni: "26935670",
        curso: "3B",
        nota: 2,
      },
      {
        nombre: "Fabio",
        apellido: "Pieres",
        edad: 39,
        dni: "4315388",
        curso: "1B",
        nota: 9,
      },
      {
        nombre: "Daniel",
        apellido: "Gallo",
        edad: 25,
        dni: "37923460",
        curso: "3B",
        nota: 2,
      },
    ];

    // Guardar los estudiantes
    // let result = await studentModel.insertMany(newStudents);
    // console.log(result);

    // Guardar un solo documento
    // let result = await studentModel.create({
    //   nombre: "Test",
    //   apellido: "Nico",
    //   edad: 30,
    //   dni: "65418864",
    //   curso: "50",
    //   nota: 10,
    // });
    // console.log(result);

    // Read de la collection
    //   let students = await studentModel.find().sort({ nombre: 1 });
    //   console.log(students);

    // Promedio de notas
    // const result = await studentModel.aggregate([
    //   {
    //     $group: {
    //       _id: "Todos",
    //       promedio: { $avg: "$nota" },
    //     },
    //   },
    // ]);
    // console.log(result);

    // Promedio del curso 1A solamente
    // const result = await studentModel.aggregate([
    //   // Agrupa los estudiantes por curso
    //   {
    //     $group: {
    //       _id: "$curso",
    //       promedio: { $avg: "$nota" },
    //     },
    //   },
    //   // Filtra el grupo
    //   {
    //     $match: {
    //       _id: "1A",
    //     },
    //   },
    // ]);
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
};

operacionesCRUD();
