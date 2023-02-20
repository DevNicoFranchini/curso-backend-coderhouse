import mongoose from 'mongoose';
import { options } from '../../../config/config.js';

class MyMongoClient {
	constructor() {
		this.client = mongoose;
	}

	async connect() {
		try {
			this.client.set('strictQuery', false);
			await this.client.connect(options.mongodb.mongodburl);
			console.log('Conexión a la base de datos: ¡Exitosa!');
		} catch (error) {
			throw new Error(`Hubo un error al conectarse. Error: ${error}`);
		}
	}

	async disconnect() {
		try {
			await this.client.connection.close();
			console.log('Desconexión exitosa.');
		} catch (error) {
			throw new Error(`Hubo un error al desconectarse: Error: ${error}`);
		}
	}
}

export { MyMongoClient };
