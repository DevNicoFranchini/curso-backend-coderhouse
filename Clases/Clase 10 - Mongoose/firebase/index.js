import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(readFileSync("./firebase-key.json"));

// console.log(serviceAccount);

// Inicializamos firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ch-backend-ecommerce.firebaseio.com",
});

console.log("Firebase conectado");

const operacionsCRUD = async () => {
  // Generar instancia de la bd
  const db = admin.firestore();

  // Definir colección
  const userCollection = db.collection("usuarios");

  // Guardar un documento
  //   const doc = userCollection.doc();

  //   await doc.create({ nombre: "Nico", edad: 21 });
  //   console.log("User created");

  // Guardar varios documentos
  //   let batch = db.batch();

  //   const usuarios = [
  //     {
  //       nombre: "Pedro",
  //       apellido: "Mei",
  //       edad: 21,
  //       dni: "31155898",
  //       curso: "1A",
  //       nota: 7,
  //     },
  //     {
  //       nombre: "Ana",
  //       apellido: "Gonzalez",
  //       edad: 32,
  //       dni: "27651878",
  //       curso: "1A",
  //       nota: 8,
  //     },
  //     {
  //       nombre: "José",
  //       apellido: "Picos",
  //       edad: 29,
  //       dni: "34554398",
  //       curso: "2A",
  //       nota: 6,
  //     },
  //   ];

  //   usuarios.forEach((usuario) => {
  //     const docRef = db.collection("usuarios").doc(); // Creamos instancia del doc que vamos a guardar.
  //     batch.set(docRef, usuario);
  //   });
  //   await batch.commit();

  // Read
  //   let response = await userCollection.get();
  //   let docs = response.docs; // Los documentos de la colección users.
  //   let users = docs.map((doc) => ({
  //     id: doc.id,
  //     nombre: doc.data().nombre,
  //     edad: doc.data().edad,
  //   }));

  //   console.log(users);

  // Update

  //   const docId = "1ElxlJVc6xXec7qwqkin";
  //   const refDoc = db.collection("usuarios").doc(docId);

  //   await refDoc.update({ edad: 25 });

  // Delete
  //   const docId = "1ElxlJVc6xXec7qwqkin";
  //   const refDoc = db.collection("usuarios").doc(docId);
  //   await refDoc.delete();
};

operacionsCRUD();
