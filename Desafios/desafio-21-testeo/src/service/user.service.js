import { options } from './../config/config.js';
import { getApiDao } from './../persistence/models/index.js';

const { UserDaoContainer } = await getApiDao(options.server.dbType);

export const getUsers = async () => {
	return await UserDaoContainer.getAll();
};

export const saveUser = async (body) => {
	return await UserDaoContainer.save(body);
};
