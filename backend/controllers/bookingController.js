import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create new booking
// @route   POST /api/bookings/create
export const createBooking = async (req, res) => {
  try {
    const { userId, eventId, ticketQuantity } = req.body;

    // Fetch the event from the Event model
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Calculate totalPrice
    const totalPrice = event.ticket_price * ticketQuantity;

    // Generate a unique bookingId using uuid
    const bookingId = uuidv4();

    // Save the booking in MongoDB using the Booking model
    const booking = new Booking({
      userId,
      eventId,
      ticketQuantity,
      totalPrice,
      eventTitle: event.title, // Populating from Event object
      bookingId
    });

    const savedBooking = await booking.save();

    // Return the saved booking as JSON response
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    // Return 500 for server errors
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
