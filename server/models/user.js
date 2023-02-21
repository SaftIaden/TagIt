import { User } from './schemas.js';

const dbGetAllUsers = () => User.find();

const dbGetUser = async (email) => User.findOne({ email: { $eq: email } });

export { dbGetAllUsers, dbGetUser };
