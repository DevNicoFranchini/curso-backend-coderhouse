import * as dotenv from 'dotenv';
dotenv.config();

export const options = {
	filesystem: {},
	awsConfig: {},
	twilioConfig: {},
	mongoDB: {
		mongoURL: process.env.MONGO || 'mongodb://localhost:27017',
	},
	port: process.env.PORT || 8080,
};
