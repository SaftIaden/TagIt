import { Project, User } from './schemas.js';

const dbGetProjects = async () => {
  console.log();
  const tags = await Project.find({});
  return tags;
};

const dbUpdateProject = async (projectName, updatedFields) => {
  const res = await Project.findOneAndUpdate(
    { projectName: { $eq: projectName } },
    { $set: updatedFields },
    { returnOriginal: false },
  );
  return res;
};

const dbCreateProject = async (projectName, projectProperties) => {
  const tag = await Project.create(
    {
      projectName,
      projectProperties,
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

const dbDeleteProject = async (projectName) => {
  await Project.findOneAndDelete({ projectName: { $eq: projectName } });
};

export {
  dbCreateProject,
  dbGetProjects,
  dbUpdateProject,
  dbGetUserProjects,
  dbDeleteProject,
};
