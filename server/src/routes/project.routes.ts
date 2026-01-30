import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';

const router = Router();

// Routes
router.post('/', upload.single('image'), createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

export default router;
