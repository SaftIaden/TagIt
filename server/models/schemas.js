import { model, Schema } from 'mongoose';

const user = new Schema({
  name: String,
  email: String,
  uid: { type: String, unique: true },
  password: String,
  profilePic: { type: String, default: null },
});
const User = model('user', user);

const tag = new Schema({
  uid: String,
  title: String,
  description: String,
  coords: {
    longitude: Number,
    latitude: Number,
  },
  created: Date,
  updated: Date,
  favourite: { type: Boolean, default: false },
  images: Array,
});
const Tag = model('tag', tag);

const album = new Schema({
  uid: String,
  title: String,
  description: String,
  pics: Array,
  created: Date,
  updated: Date,
  favourite: { type: Boolean, default: false },
});
const Album = model('album', album);

const tempUser = new Schema({
  name: String,
  email: String,
  password: String,
});
const TempUser = model('tempUser', tempUser);

export { User, Tag, Album, TempUser };
