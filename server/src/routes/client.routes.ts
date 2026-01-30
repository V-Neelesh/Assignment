import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/client.controller';

const router = Router();

// Routes
router.post('/', upload.single('image'), createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', upload.single('image'), updateClient);
router.delete('/:id', deleteClient);

export default router;
