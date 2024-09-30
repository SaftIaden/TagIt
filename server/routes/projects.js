import express from 'express';
import asyncHandler from 'express-async-handler';

import { getAllProjects, addProject, updateProject, getUserProjects, deleteProject } from '../controllers/projects.js';

const router = express.Router();

router.get('/all', asyncHandler(getAllProjects));
router.get('/', asyncHandler(getUserProjects));
router.post('/', asyncHandler(addProject));
router.patch('/:projectName', asyncHandler(updateProject));
router.delete('/:projectName', asyncHandler(deleteProject));

export default router;
