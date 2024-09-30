import {
  dbGetprojectData,
  dbUpdateProjectData,
  dbFindProjectData,
  dbDeleteProjectData,
  dbCreateProjectData,
} from '../models/data.js';

const getProjectData = async (req, res) => {
  const { projectName } = req.params;
  const projectData = await dbGetprojectData(projectName);
  return res.status(200).json(projectData);
};

const updateData = async (req, res) => {
  const { projectName, date } = req.params;
  const { updatedFields } = req.body;
  const result = await dbUpdateProjectData(projectName, date, updatedFields);
  return res.status(200).json(result);
};

const deleteData = async (req, res) => {
  const { projectName, date } = req.params;
  const found = await dbFindProjectData(id);
  if (!found) return res.status(404).send('Tag does not exist');
  await dbDeleteProjectData(projectName, date);
  return res.status(200).send('Deleted');
};

const createProjectData = async (req, res) => {
  const { updatedFields } = req.body;
  const { projectName } = req.params;
  const data = await dbCreateProjectData(projectName, updatedFields);
  return res.status(200).json(data);
};

export {
  getProjectData,
  createProjectData,
  updateData,
  deleteData,
};
