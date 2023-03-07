import express from 'express';
import asyncHandler from 'express-async-handler';

import { getUserTags, updateTag } from '../controllers/tags.js';

const router = express.Router();

router.get('/', asyncHandler(getUserTags));
router.post('/:id', asyncHandler(updateTag));

export default router;
