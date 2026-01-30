import { Router } from 'express';
import {
  subscribeNewsletter,
  getNewsletterSubscribers,
  unsubscribeNewsletter,
} from '../controllers/newsletter.controller';

const router = Router();

// Routes
router.post('/', subscribeNewsletter);
router.get('/', getNewsletterSubscribers);
router.delete('/:id', unsubscribeNewsletter);

export default router;
