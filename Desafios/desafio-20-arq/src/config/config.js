import * as dotenv from 'dotenv';
import ParsedArgs from 'minimist';

dotenv.config();

const objArgs = ParsedArgs(process.argv.slice(2), {
	alias: {
		p: 'port',
		m: 'mode',
		e: 'env',
	},
	default: {
		port: process.env.PORT || 8080,
		mode: 'FORK',
		env: 'DEV',
	},
});

export const options = {
	server: {
		port: objArgs.port,
		mode: objArgs.mode,
		node_env: objArgs.env,
		dbType: process.env.DB_TYPE || 'MONGO',
	},
	mongodb: process.env.MONGO || 'mongodb://localhost:27017',
	mongosessions: process.env.SESSIONS || 'mongodb://localhost:27017',
};
