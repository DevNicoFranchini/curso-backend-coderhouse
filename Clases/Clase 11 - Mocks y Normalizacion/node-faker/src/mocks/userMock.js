import { ContenedorMemoria } from "../containers/memoria.js";
import { faker } from "@faker-js/faker";

const { datatype, name, internet, image } = faker;

faker.locale = "es";

class UserMock extends ContenedorMemoria {
  constructor() {
    super();
  }

  populate(cant) {
    let newUsers = [];

    for (let i = 0; i < cant; i++) {
      newUsers.push({
        id: datatype.uuid(),
        nombre: name.firstName(),
        apellido: name.lastName(),
        correo: internet.email(),
        avatar: image.avatar(),
      });
    }
    this.users = [...this.users, ...newUsers];
    return newUsers;
  }
}

export { UserMock };
