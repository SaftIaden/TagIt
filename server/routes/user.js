import express from 'express';
import asyncHandler from 'express-async-handler';

import { getAllUsers, login, logout, getUserName, register, validateRegister, changeUserProjects, changeUserRole } from '../controllers/user.js';

const router = express.Router();

router.get('/', asyncHandler(getAllUsers));
router.post('/login', asyncHandler(login));
router.post('/logout', logout);
router.get('/checkuser/:name', asyncHandler(getUserName));
router.post('/register', asyncHandler(register));
router.get('/validateRegister/:token', asyncHandler(validateRegister));
router.patch('/:username', asyncHandler(changeUserProjects));
router.patch('/role/:username', asyncHandler(changeUserRole));

export default router;
