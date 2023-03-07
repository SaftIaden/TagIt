import { dbGetUserTags, dbUpdateTag } from '../models/tags.js';

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

export { getUserTags, updateTag };
