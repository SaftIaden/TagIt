import { dbGetAllUsers, dbGetUser } from '../models/user.js';
import { validateLogin } from '../middleware/validators.js';

const login = async (req, res) => {
  if (!validateLogin(req.body)) {
    return res.status(400).send('Deine Eingabe hat das falsche Format!');
  }
  const { email, passwort } = req.body;
  const user = await dbGetUser(email);
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

export { login, logout, getAllUsers };
