import {
  dbGetUserAlbums,
  dbDeleteAlbum,
  dbFindAlbum,
  dbCreateAlbum,
  dbUpdateAlbum,
  dbFavouriteAlbum,
} from '../models/albums.js';

const getUserAlbums = async (req, res) => {
  if (req.session.userid === undefined) return res.status(401).send('Unauthorized');
  const { userid } = req.session;
  const Albums = await dbGetUserAlbums(userid);
  return res.status(200).json(Albums);
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const found = await dbFindAlbum(id);
  if (!found) return res.status(404).send('Album does not exist');
  if (found.uid !== req.session.userid) return res.status(401).send('Unauthorized');
  await dbDeleteAlbum(id);
  return res.status(200).send('Deleted');
};

const createAlbum = async (req, res) => {
  const { updatedFields } = req.body;
  if (!req.session.userid) return res.status(401).send('Unauthorized');
  const data = await dbCreateAlbum(req.session.userid, updatedFields);
  return res.status(200).json(data);
};

const favouriteAlbum = async (req, res) => {
  const { id } = req.params;
  const found = await dbFindAlbum(id);
  if (!found) return res.status(404).send('Album does not exist');
  if (found.uid !== req.session.userid) return res.status(401).send('Unauthorized');
  const favourite = !found.favourite;
  await dbFavouriteAlbum(id, favourite);
  return res.status(200).send('success');
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { updatedFields } = req.body;
  if (req.session.userid === undefined) return res.status(401).send('Unauthorized');
  const result = await dbUpdateAlbum(id, updatedFields);
  return res.status(200).json(result);
};

export { getUserAlbums, deleteAlbum, createAlbum, favouriteAlbum, updateAlbum };
