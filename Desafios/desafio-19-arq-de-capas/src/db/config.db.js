import mongoose from 'mongoose';

import { options } from './../config/config.js';

export const connectDB = () => {
	try {
		const mongoDBUrl = options.mongodb;
		mongoose.set('strictQuery', true);
		mongoose.connect(mongoDBUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.log(`Hubo un error conectándose a la base. Error: ${error}`);
	}
	console.log('Conexión a la base de datos de manera exitosa');
};
