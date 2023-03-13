import { Album } from './schemas.js';

const dbGetUserAlbums = async (id) => {
  const albums = await Album.find({ uid: { $eq: id } });
  return albums;
};

const dbDeleteAlbum = async (id) => {
  await Album.findOneAndDelete({ _id: { $eq: id } }, { returnOriginal: true });
};

const dbFindAlbum = async (id) => {
  const res = await Album.findOne({ _id: { $eq: id } });
  return res;
};

const dbCreateAlbum = async (uid, updatedFields) => {
  const album = await Album.create({
    uid,
    title: updatedFields.title,
    description: updatedFields.description,
    tags: updatedFields.tags,
    coords: updatedFields.coords,
    created: Date.now(),
    updated: Date.now(),
  });
  return album;
};

const dbUpdateAlbum = async (id, updatedFields) => {
  const res = await Album.findOneAndUpdate(
    { _id: { $eq: id } },
    { $set: updatedFields, updated: Date.now() },
    { returnOriginal: false },
  );
  return res;
};

const dbFavouriteAlbum = async (id, favourite) => {
  await Album.findOneAndUpdate({ _id: { $eq: id } }, { $set: { favourite }, updated: Date.now() });
};

export {
  dbGetUserAlbums,
  dbDeleteAlbum,
  dbFindAlbum,
  dbCreateAlbum,
  dbUpdateAlbum,
  dbFavouriteAlbum,
};
