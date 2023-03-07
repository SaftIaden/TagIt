import { Tag } from './schemas.js';

const dbGetUserTags = async (id) => {
  console.log(id);
  const tags = await Tag.find({ uid: { $eq: id } });
  return tags;
};

const dbUpdateTag = async (id, updatedFields) => {
  const res = await Tag.findOneAndUpdate(
    { _id: { $eq: id } },
    { $set: updatedFields, updated: Date.now() },
    { returnOriginal: false },
  );
  return res;
};

export { dbGetUserTags, dbUpdateTag };
