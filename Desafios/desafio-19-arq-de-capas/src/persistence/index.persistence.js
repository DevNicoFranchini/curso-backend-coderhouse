import { UserModel } from './models/user.model.js';

export const UserManager = new MongoContainer(UserModel);
