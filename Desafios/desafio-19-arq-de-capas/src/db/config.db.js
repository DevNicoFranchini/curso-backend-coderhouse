import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { options } from './../config/config.js';

// Connection to db config
const connectDB = (app) => {
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

// Session db config
const sessionDB = (app) => {
	app.use(
		session({
			store: MongoStore.create({
				mongoUrl: options.mongosessions,
				mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			}),
			secret: 'claveSecreta',
			resave: false,
			saveUninitialized: false,
		})
	);
};

export { connectDB, sessionDB };
