import { UserModel } from './dbmodel/user.model.js';
import { MyMongoClient } from './clients/mongoclient.js';

export async function getApiDao(dbType) {
	let UserDaoContainer;
	switch (dbType) {
		case 'MONGO':
			const { UserMongoDao } = await import('./daos/users/users.dao.js');
			const client = new MyMongoClient();
			await client.connect();
			UserDaoContainer = new UserMongoDao(UserModel);
			break;
		default:
			break;
	}
	return { UserDaoContainer };
}
