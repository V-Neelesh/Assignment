import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const uploadDirRoot = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

// Ensure base upload directories exist
if (!fs.existsSync(uploadDirRoot)) {
  fs.mkdirSync(uploadDirRoot, { recursive: true });
}

// Configure storage to put files into subfolders based on route (projects/clients)
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    let subFolder = '';
    const baseUrl = (req.baseUrl || '').toLowerCase();
    if (baseUrl.includes('projects')) subFolder = 'projects';
    else if (baseUrl.includes('clients')) subFolder = 'clients';
    const dest = subFolder ? path.join(uploadDirRoot, subFolder) : uploadDirRoot;

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images only
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
