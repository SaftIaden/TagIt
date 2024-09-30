import { User, TempUser } from './schemas.js';

const dbGetAllUsers = async () => User.find();

const dbGetUserByMail = async (email) => User.findOne({ email: { $eq: email } });

const dbGetUserByName = async (name) => User.findOne({ name: { $eq: name } });

const dbPostTempUser = async (email, name, password) => TempUser.create({ name, email, password });

const dbMakeUserValid = async (name, uid) => {
  const user = await TempUser.findOne({ name: { $eq: name } });
  console.log(user);
  User.create({ name: user.name, email: user.email, password: user.password, uid, projects: [], role: 'user' });
  await TempUser.deleteOne({ name: { $eq: name } });
};

const dbCheckForUid = async (uid) => User.findOne({ uid: { $eq: uid } });

const dbChangeUserProjects = async (username, updatedProjects) => {
  const user = await User.findOneAndUpdate(
    { name: { $eq: username } },
    { $set: { projects: updatedProjects } },
    { new: true },
  );
  return user;
};

const dbChangeUserRole = async (username, updatedRole) => {
  const user = await User.findOneAndUpdate(
    { name: { $eq: username } },
    { $set: { role: updatedRole } },
    { new: true },
  );
  return user;
};

export {
  dbGetAllUsers,
  dbGetUserByMail,
  dbGetUserByName,
  dbPostTempUser,
  dbMakeUserValid,
  dbCheckForUid,
  dbChangeUserProjects,
  dbChangeUserRole,
};
