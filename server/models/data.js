import { Day } from './schemas.js';

const dbGetprojectData = async (projectName) => {
  const data = await Day.find({ projectName: { $eq: projectName } });
  return data;
};

const dbUpdateProjectData = async (projectName, date, updatedFields) => {
  const res = await Project.findOneAndUpdate(
    { projectName: { $eq: projectName } },
    { date: { $eq: date } },
    { $set: updatedFields },
    { returnOriginal: false },
  );
  return res;
};

const dbFindProjectData = async (projectName, date) => {
  const data = await Day.find(
    { projectName: { $eq: projectName } },
    { date: { $eq: date } },
  );
  return data;
};

const dbCreateProjectData = async (projectName) => {
  const tag = await Day.create(
    {
      projectName,
      visitors: [],
    },
  );
  return tag;
};

const dbGetUserProjects = async (id) => {
  console.log(id);
  const user = await User.find({ uid: { $eq: id } });
  const projects = [];
  if (user.projects?.length) {
    user.projects.foreach(async (el) => {
      const found = await Project.find({ projectName: { $eq: el } });
      projects.push(found);
    });
    return projects;
  }
  return [];
};

const dbDeleteProjectData = async (projectName, date) => {
  await Day.findOneAndDelete(
    { projectName: { $eq: projectName } },
    { date: { $eq: date } },
  );
};

export {
  dbGetprojectData,
  dbUpdateProjectData,
  dbFindProjectData,
  dbDeleteProjectData,
  dbCreateProjectData,
};
