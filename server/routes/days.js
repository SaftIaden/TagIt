import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getProjectData,
  createProjectData,
  updateData,
  deleteData,
} from '../controllers/data.js';

const router = express.Router();

router.get(':/projectName', asyncHandler(getProjectData)); // Get Data for specific Project
router.post('/:projectName', asyncHandler(createProjectData)); // Upload Data to specific project
router.patch('/:proejctName/:date', asyncHandler(updateData)); // Update Data for specific Day inn secific Project
router.delete('/projectName/:date', asyncHandler(deleteData)); // Delete Data for specific Day

export default router;
