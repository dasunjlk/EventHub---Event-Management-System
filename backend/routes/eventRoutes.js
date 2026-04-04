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

// Public routes
router.get('/', getAllEvents);

// Protected routes
// GET /api/events/my-events -> gets events for the specific organizer safely!
router.get('/my-events', protect, authorizeRoles('organizer', 'admin'), getMyEvents);

router.get('/:id', getEventById);

// Protected routes
// POST /api/events -> only organizer or admin
router.post('/', protect, authorizeRoles('organizer', 'admin'), createEvent);

// PUT /api/events/:id -> only organizer who created event OR admin
// (Ownership logic is placed inside the controller)
router.put('/:id', protect, authorizeRoles('organizer', 'admin'), updateEvent);

// DELETE /api/events/:id -> only organizer who created event OR admin
// (Ownership logic is placed inside the controller)
router.delete('/:id', protect, authorizeRoles('organizer', 'admin'), deleteEvent);

export default router;
