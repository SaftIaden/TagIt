import { User, TempUser } from './schemas.js';

const dbGetAllUsers = () => User.find();

const dbGetUserByMail = async (email) => User.findOne({ email: { $eq: email } });

const dbGetUserByName = async (name) => User.findOne({ name: { $eq: name } });

const dbPostTempUser = async (email, name, password) => TempUser.create({ name, email, password });

const dbMakeUserValid = async (name, uid) => {
  const user = await TempUser.findOne({ name: { $eq: name } });
  console.log(user);
  User.create({ name: user.name, email: user.email, password: user.password, uid });
  await TempUser.deleteOne({ name: { $eq: name } });
};

const dbCheckForUid = async (uid) => User.findOne({ uid: { $eq: uid } });

export {
  dbGetAllUsers,
  dbGetUserByMail,
  dbGetUserByName,
  dbPostTempUser,
  dbMakeUserValid,
  dbCheckForUid,
};
