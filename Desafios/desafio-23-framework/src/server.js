import cluster from 'cluster';
import os from 'os';

import { Server } from 'socket.io';

import { options } from './config/config.js';
import { app, normalizeMessages } from './app.js';

const PORT = options.server.port;
const MODE = options.server.mode;

// Servidor de express
if (MODE === 'CLUSTER' && cluster.isPrimary) {
	const numCPUS = os.cpus().length; // Num. de núcleos del procesador.
	for (let i = 0; i < numCPUS; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		cluster.fork();
	});
} else {
	const server = app.listen(PORT, () =>
		console.log(
			`Ivan, el servidor está corriendo en el puerto ${PORT} on process ${process.pid}`
		)
	);
	server.on('error', (error) =>
		console.log(`Hubo un problema en el servidor. Error: ${error}`)
	);

	// Servidor de websocket y lo conectamos con el servidor de express
	const io = new Server(server);

	// Configurar el socket
	io.on('connection', async (socket) => {
		// console.log("Se ha conectado un nuevo cliente con el id:", socket.id);

		// Carga inicial de mensajes
		io.sockets.emit('mensajes', await normalizeMessages());

		// Actualización de mensajes
		socket.on('nuevoMensaje', async (mensaje) => {
			//console.log(mensaje);
			mensaje.fyh = new Date().toLocaleString();
			await messagesApi.save(mensaje);
			io.sockets.emit('mensajes', await normalizeMessages());
		});
	});
}
