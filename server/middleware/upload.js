import multer from 'multer';
import path from 'path';

const dirname = path.resolve();

const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(dirname, '/public/images'));
  },
  filename(req, file, cb) {
    console.log(file);
    const uniquePreffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.mimetype.split('/');
    cb(null, `${uniquePreffix}.${extension[extension.length - 1]}`);
  },
});

const uploadTagImage = multer({ storage: imageStorage }).array('image');

export { uploadTagImage };
