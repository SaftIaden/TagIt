import { dbCreateProject, dbGetProjects, dbUpdateProject, dbGetUserProjects, dbDeleteProject } from '../models/projects.js';

const getAllProjects = async (req, res) => {
  const Tags = await dbGetProjects();
  return res.status(200).json(Tags);
};

const addProject = async (req, res) => {
  const { updatedFields } = req.body;
  await dbCreateProject(updatedFields.projectName, updatedFields.projectProperties);
  return res.status(200).send('Added Project Successfullly');
};

const updateProject = async (req, res) => {
  const { projectName } = req.params;
  const { updatedFields } = req.body;
  const result = await dbUpdateProject(projectName, updatedFields);
  return res.status(200).json(result);
};

const getUserProjects = async (req, res) => {
  if (req.session.userid === undefined) return res.status(401).send('Unauthorized');
  const { userid } = req.session;
  const Tags = await dbGetUserProjects(userid);
  return res.status(200).json(Tags);
};

const deleteProject = async (req, res) => {
  // TODO: Add check if project exists
  const { projectName } = req.params;
  await dbDeleteProject(projectName);
  return res.status(200).send('Deleted');
};

export { getAllProjects, addProject, updateProject, getUserProjects, deleteProject };
