import { v4 as uuidv4 } from 'uuid';

import {
  dbGetAllUsers,
  dbGetUserByMail,
  dbGetUserByName,
  dbPostTempUser,
  dbMakeUserValid,
  dbCheckForUid,
  dbChangeUserProjects,
  dbChangeUserRole,
} from '../models/user.js';
import { validateLogin, validatorRegister } from '../middleware/validators.js';
import { sendVerificationMail, tokenGenerator, validateToken } from '../middleware/tokenSender.js';

const login = async (req, res) => {
  if (!validateLogin(req.body)) {
    return res.status(400).send('Deine Eingabe hat das falsche Format!');
  }
  const { email, passwort } = req.body;
  const user = await dbGetUserByMail(email);
  if (!user) return res.status(404).send('Email nicht gefunden!');
  if (user.password !== passwort) return res.status(401).send('Falsches Passwort');
  const { uid, profilepic } = user;
  req.session.userid = uid;
  return res.status(200).json({ uid, email, profilepic });
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  return res.status(200).end();
};

const getAllUsers = async (req, res) => {
  const data = await dbGetAllUsers();
  return res.status(200).json(data);
};

const register = async (req, res) => {
  if (!validatorRegister(req.body)) {
    return res.status(400).send('Deine Eingabe hat das falsche Format!');
  }
  const { email, passwort, name } = req.body;
  await dbPostTempUser(email, name, passwort);
  const token = tokenGenerator(name);
  sendVerificationMail(email, token);
  return res.status(200).send('Registered Sucessfully');
};

const getUserName = async (req, res) => {
  const { name } = req.params;
  if (name === undefined) return res.status(400).send('No Name provided');
  const foundUser = await dbGetUserByName(name);
  if (foundUser !== null) {
    return res.status(200).send(true);
  }
  return res.status(200).send(false);
};

const validateRegister = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  let uid = uuidv4();
  while (true) {
    const founduid = dbCheckForUid(uid);
    if (founduid.uid === undefined) break;
    else {
      uid = uuidv4();
    }
  }
  const name = validateToken(token);
  console.log(name);
  await dbMakeUserValid(name, uid);
  res.redirect('http://localhost:8080/verify');
};

const changeUserProjects = async (req, res) => {
  const { username } = req.params;
  const { updatedProjects } = req.body;
  try {
    const updatedUser = await dbChangeUserProjects(username, updatedProjects);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const changeUserRole = async (req, res) => {
  const { username } = req.params;
  const { updatedRole } = req.body;
  try {
    const updatedUser = await dbChangeUserRole(username, updatedRole);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  login,
  logout,
  getAllUsers,
  register,
  getUserName,
  validateRegister,
  changeUserProjects,
  changeUserRole,
};
