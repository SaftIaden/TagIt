import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getUserTags,
  updateTag,
  uploadImage,
  deleteTag,
  favouriteTag,
  createTag,
} from '../controllers/tags.js';

const router = express.Router();

router.get('/', asyncHandler(getUserTags));
router.post('/image', asyncHandler(uploadImage));
router.post('/upload/:id', asyncHandler(updateTag));
router.delete('/:id', asyncHandler(deleteTag));
router.post('/favourite/:id', asyncHandler(favouriteTag));
router.post('/', asyncHandler(createTag));

export default router;
