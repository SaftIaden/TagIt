import { model, Schema } from 'mongoose';

const project = new Schema({
  projectName: String,
  projectProperties: {
    categories: Array,
    ageGroups: Array,
    gender: Array,
  },
});

const Project = model('project', project);

const user = new Schema({
  name: String,
  email: String,
  uid: { type: String, unique: true },
  password: String,
  projects: [String],
  role: String,
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

const day = new Schema({
  uid: String,
  title: String,
  project: String,
  user: String,
  data: Object,
  date: Date,
  created: Date,
  updated: Date,
});
const Day = model('day', day);

const album = new Schema({
  uid: String,
  title: String,
  description: String,
  tags: Array,
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

export { User, Tag, Album, TempUser, Project, Day };
