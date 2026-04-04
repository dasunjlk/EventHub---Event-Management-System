import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents
} from '../controllers/eventController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/my-events', protect, authorizeRoles('organizer', 'admin'), getMyEvents);

router.get('/:id', getEventById);

router.post('/', protect, authorizeRoles('organizer', 'admin'), createEvent);

router.put('/:id', protect, authorizeRoles('organizer', 'admin'), updateEvent);

router.delete('/:id', protect, authorizeRoles('organizer', 'admin'), deleteEvent);

export default router;
