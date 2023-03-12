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

const dbDeleteTag = async (id) => {
  await Tag.findOneAndDelete({ _id: { $eq: id } }, { returnOriginal: true });
};

const dbFindTag = async (id) => {
  const res = await Tag.findOne({ _id: { $eq: id } });
  return res;
};

const dbFavouriteTag = async (id, favourite) => {
  await Tag.findOneAndUpdate({ _id: { $eq: id } }, { $set: { favourite }, updated: Date.now() });
};

const dbCreatetag = async (uid, updatedFields) => {
  const tag = await Tag.create(
    {
      uid,
      title: updatedFields.title,
      description: updatedFields.description,
      images: updatedFields.images,
      coords: updatedFields.coords,
      created: Date.now(),
      updated: Date.now(),
    },
  );
  return tag;
};

export { dbGetUserTags, dbUpdateTag, dbDeleteTag, dbFindTag, dbFavouriteTag, dbCreatetag };
