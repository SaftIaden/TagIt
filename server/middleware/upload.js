import multer from 'multer';
import path from 'path';

const dirname = path.resolve();

const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(dirname, '/public/images'));
  },
  filename(req, file, cb) {
    const uniquePreffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniquePreffix}-${file.originalname}`);
  },
});

const uploadTagImage = multer({ storage: imageStorage }).array('image');

export { uploadTagImage };
