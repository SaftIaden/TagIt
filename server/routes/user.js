import express from 'express';
import asyncHandler from 'express-async-handler';

import { getAllUsers, login, logout } from '../controllers/user.js';

const router = express.Router();

router.get('/', asyncHandler(getAllUsers));
router.post('/login', asyncHandler(login));
router.post('/logout', logout);

export default router;
