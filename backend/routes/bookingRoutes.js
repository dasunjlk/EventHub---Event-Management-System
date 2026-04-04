import express from 'express';
import { createBooking, getUserBookings, cancelBooking, updateBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.delete('/:bookingId', protect, cancelBooking);
router.put('/:bookingId', protect, updateBooking);

export default router;
