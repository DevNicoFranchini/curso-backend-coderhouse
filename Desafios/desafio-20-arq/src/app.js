import express from 'express';
import handlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { URL } from 'url';
import { normalize, schema } from 'normalizr';

import { connectDB, sessionDB } from './db/config.db.js';
import { apiRouter } from './routes/index.routes.js';
import { logger } from './../logs/logger.js';
import { MessagesContainer } from './controllers/messages.controller.js';

import {
	signupStrategy,
	loginStrategy,
	serializeUser,
	deserializeUser,
} from './persistence/passport/passport.js';

const app = express();
const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + './public'));
app.use(compression());

app.use(cookieParser());

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('views', './src/public/views');
app.set('view engine', 'hbs');

sessionDB(app);
connectDB(app);

app.use(passport.initialize());
app.use(passport.session());

loginStrategy();
signupStrategy();
serializeUser();
deserializeUser();

app.use('/api', apiRouter);

const messagesApi = new MessagesContainer('./src/files/messages.txt');

// Logger
const infoLogger = (req, res, next) => {
	logger.info(`ruta : ${req.path}, peticion : ${req.method}`);
	next();
};

app.use(infoLogger);
app.get('/*', (req, res) => {
	logger.warn(`Ruta: ${req.path} inexistente. Peticion: ${req.method}`);
});

// Normalización
const authorSchema = new schema.Entity('authors', {});
const msgSchema = new schema.Entity('mensajes', { author: authorSchema });
const chatSchema = new schema.Entity(
	'chat',
	{
		mensajes: [msgSchema],
	},
	{ idAttribute: 'id' }
);

// Aplicar la normalización
const normalizeData = (data) => {
	const normalizedData = normalize(
		{
			id: 'chatHistory',
			mensajes: data,
		},
		chatSchema
	);
	return normalizedData;
};

const normalizeMessages = async () => {
	const results = await messagesApi.getAll();
	const normalizedMsgs = normalizeData(results);
	return normalizedMsgs;
};

export { app, normalizeMessages };
