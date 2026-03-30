import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, authorizeRoles('organizer', 'admin'), createEvent);
router.put('/:id', protect, authorizeRoles('organizer', 'admin'), updateEvent);
router.delete('/:id', protect, authorizeRoles('organizer', 'admin'), deleteEvent);

export default router;
