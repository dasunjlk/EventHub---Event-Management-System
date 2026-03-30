import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create new booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { user_id, event_id, ticket_quantity } = req.body;

    // Validate required fields
    if (!user_id || !event_id || !ticket_quantity) {
      return res.status(400).json({ success: false, message: 'Please provide user_id, event_id, and ticket_quantity' });
    }

    // Fetch the event from the Event model
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Calculate totalPrice
    const total_price = event.ticket_price * ticket_quantity;

    // Generate a unique bookingId using uuid
    const bookingId = uuidv4();

    // Save the booking in MongoDB using the Booking model
    const booking = new Booking({
      user_id,
      event_id,
      ticket_quantity,
      total_price,
      eventTitle: event.title, // Populating from Event object
      bookingId
    });

    const savedBooking = await booking.save();

    // Return the saved booking as JSON response
    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    // Return 500 for server errors
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all bookings for the currently logged-in user
// @route   GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user._id;

    // Query the Booking collection for bookings matching the user_id
    const bookings = await Booking.find({ user_id })
      .populate('event_id', 'title date location');

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
