import {
  dbGetUserTags,
  dbUpdateTag,
  dbDeleteTag,
  dbFindTag,
  dbFavouriteTag,
} from '../models/tags.js';
import { uploadTagImage } from '../middleware/upload.js';

const getUserTags = async (req, res) => {
  if (req.session.userid === undefined) return res.status(401).send('Unauthorized');
  const { userid } = req.session;
  const Tags = await dbGetUserTags(userid);
  return res.status(200).json(Tags);
};

const updateTag = async (req, res) => {
  const { id } = req.params;
  const { updatedFields } = req.body;
  if (req.session.userid === undefined) return res.status(401).send('Unauthorized');
  const result = await dbUpdateTag(id, updatedFields);
  return res.status(200).json(result);
};

const uploadImage = async (req, res) => {
  uploadTagImage(req, res, (error) => {
    if (error) return res.status(400);
    console.log(res.req);
    return res.status(200).json(res.req.files);
  });
};

const deleteTag = async (req, res) => {
  const { id } = req.params;
  const found = await dbFindTag(id);
  if (!found) return res.status(404).send('Tag does not exist');
  if (found.uid !== req.session.userid) return res.status(401).send('Unauthorized');
  await dbDeleteTag(id);
  return res.status(200).send('Deleted');
};

const favouriteTag = async (req, res) => {
  const { id } = req.params;
  const found = await dbFindTag(id);
  if (!found) return res.status(404).send('Tag does not exist');
  if (found.uid !== req.session.userid) return res.status(401).send('Unauthorized');
  const favourite = !found.favourite;
  await dbFavouriteTag(id, favourite);
  return res.status(200).send('success');
};

export { getUserTags, updateTag, uploadImage, deleteTag, favouriteTag };
