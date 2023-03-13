import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getUserAlbums,
  deleteAlbum,
  createAlbum,
  updateAlbum,
  favouriteAlbum,

} from '../controllers/albums.js';

const router = express.Router();

router.get('/', asyncHandler(getUserAlbums));
router.post('/', asyncHandler(createAlbum));
router.delete('/:id', asyncHandler(deleteAlbum));
router.post('/favourite/:id', asyncHandler(favouriteAlbum));
router.patch('/:id', asyncHandler(updateAlbum));

export default router;
