const e = require("express");
const fs = require("fs");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }

  // Función guardar un producto
  save = async (product) => {
    try {
      // Veo si el archivo existe.
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8");

        // Verifico si hay contenido
        if (contenido) {
          const productos = JSON.parse(contenido);
          const lastIdAdded = productos.reduce(
            (acc, item) => (item.id > acc ? (acc = item.id) : acc),
            0
          );
          if (product.title && product.price && product.thumbnail) {
            const newProduct = {
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              id: lastIdAdded + 1,
            };
            productos.push(newProduct);
            // Sobreescribo el archivo
            await fs.promises.writeFile(
              this.nameFile,
              JSON.stringify(productos, null, 2)
            );

            return newProduct;
          } else {
            throw new Error("Complete campos");
          }
        }

        //Si no hay contenido
        else {
          const newProduct = {
            id: 1,
            title: product.title,
            price: product.title,
            thumbnail: product.thumbnail,
          };
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify([newProduct], null, 2)
          );
        }
      }

      // Si no existe el archivo
      else {
        const newProduct = {
          id: 1,
          title: product.title,
          price: product.title,
          thumbnail: product.thumbnail,
        };
        await fs.promises.writeFile(
          // Escribo nuevo archivo
          this.nameFile,
          JSON.stringify([newProduct], null, 2)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Función buscar por id
  getById = async (id) => {
    try {
      // Verifico que el archivo exista
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8"); // Leo el archivo si existe
        // Verifico que haya contenido
        if (contenido) {
          const productos = JSON.parse(contenido);
          const producto = productos.find((item) => item.id === id); // Busco id solicitado
          return producto;
        } else {
          return "El archivo está vacío";
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Función que devuelve todos los productos
  getAll = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      const productos = JSON.parse(contenido);
      return productos;
    } catch (err) {
      console.log(err);
    }
  };

  // Función que elimina todos los productos
  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  };

  // Función que elimina un objeto por su id
  deleteById = async (id) => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      const productos = JSON.parse(contenido);
      const newProducts = productos.filter((item) => item.id !== id);
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Función que actualiza por id
  updateById = async (id, body) => {
    try {
      const product = await this.getById(parseInt(id));
      const products = await this.getAll();

      let newProduct = {};

      newProduct.title = !body.title ? product.title : body.title;
      newProduct.price = !body.price ? product.price : body.price;
      newProduct.thumbnail = !body.thumbnail
        ? product.thumbnail
        : body.thumbnail;
      newProduct.id = product.id;

      const index = products.findIndex((item) => item.id === parseInt(id));
      products[index] = newProduct;

      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(products, null, 2)
      );

      return newProduct;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = Contenedor;
