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
          const newProduct = {
            id: lastIdAdded + 1,
            ...product,
          };
          productos.push(newProduct);
          // Sobreescribo el archivo
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(productos, null, 2)
          );
        }
        //Si no hay contenido
        else {
          const newProduct = {
            id: 1,
            ...product,
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
          ...product,
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
}

const listaProductos = new Contenedor("./productos.txt");

const product1 = {
  title: "Caramelo",
  price: 10,
  thumbnail:
    "https://www.deliargentina.com/image/cache/catalog/product/alimentacion/caramelo-flynn-paff/2437D360-334A-4E11-A68E-6F1DF71DB0F0-335x335.jpeg",
};

const product2 = {
  title: "Chupetin",
  price: 15,
  thumbnail:
    "https://www.cucinare.tv/wp-content/uploads/2020/07/Chupa-Chups.jpg",
};

const product3 = {
  title: "Alfajor",
  price: 50,
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_787190-MLA26513270776_122017-O.jpg",
};

const product4 = {
  title: "Gaseosa",
  price: 100,
  thumbnail:
    "https://www.clubmarket.com.ar/wp-content/uploads/coca-cola-pet-x-2.5l.jpg",
};

const crearProducto = async () => {
  await listaProductos.save(product1);
  await listaProductos.save(product2);
  await listaProductos.save(product3);
  await listaProductos.save(product4);
  // Obtengo todos los productos
  const productos1 = await listaProductos.getAll();
  console.log("Los productos son: ", productos1);
  // Busco el id 3 y obtengo el producto correspondiente
  const searchId1 = await listaProductos.getById(3);
  console.log(searchId1);
  // Elimino el producto con id 1
  await listaProductos.deleteById(1);
  // Vuelvo a obtener todos los productos para verificar el eliminado
  const productos2 = await listaProductos.getAll();
  console.log("Los nuevos productos son: ", productos2);
  // Agrego un nuevo producto para verificar nuevo id
  await listaProductos.save(product3);
  // Verifico nuevamente los productos
  const productos3 = await listaProductos.getAll();
  console.log("Los nuevos productos son: ", productos3);
  // Elimino todos los productos
  await listaProductos.deleteAll();
  // Verifico nuevamente los productos
  const productos4 = await listaProductos.getAll();
  console.log("Los nuevos productos son: ", productos4);
};

crearProducto();
