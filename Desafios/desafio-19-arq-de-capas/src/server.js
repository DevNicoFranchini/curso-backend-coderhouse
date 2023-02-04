import express from 'express';
import handlebars from 'express-handlebars';

import { URL } from 'url';
import { options } from './config/config.js';
import { connectDB } from './db/config.db.js';
import { apiRouter } from './routes/index.routes.js';

const __dirname = new URL('.', import.meta.url).pathname;
const PORT = options.port;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('views', './src/public/views');
app.set('view engine', 'hbs');

connectDB();

const server = app.listen(PORT, () =>
	console.log(
		`Ivan, el servidor está corriendo en el puerto ${PORT} on process ${process.pid}`
	)
);
server.on('error', (error) =>
	console.log(`Hubo un problema en el servidor. Error: ${error}`)
);

app.use('/api', apiRouter);
