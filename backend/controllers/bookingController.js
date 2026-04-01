import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { event_id, ticket_quantity } = req.body;
    const user_id = req.user.userId;

    // Validate required fields
    if (!event_id || !ticket_quantity) {
      return res.status(400).json({ success: false, message: 'Please provide event_id, and ticket_quantity' });
    }

    // Fetch the event from the Event model
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check ticket availability
    if (event.available_tickets < ticket_quantity) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    // Calculate totalPrice
    const total_price = event.ticket_price * ticket_quantity;

    // Generate a unique bookingId using uuid
    const bookingId = uuidv4();

    // Use a transaction or atomic update if possible, but for simplicity and common practice 
    // we'll use findByIdAndUpdate for atomic decrement
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: event_id, available_tickets: { $gte: ticket_quantity } },
      { $inc: { available_tickets: -ticket_quantity } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(400).json({ success: false, message: 'Could not secure tickets. Please try again.' });
    }

    // Save the booking in MongoDB using the Booking model
    const booking = new Booking({
      user_id,
      event_id,
      ticket_quantity,
      total_price,
      eventTitle: event.title,
      bookingId
    });

    const savedBooking = await booking.save();

    // Return the saved booking as JSON response
    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all bookings for the currently logged-in user
// @route   GET /api/bookings/user
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.userId;

    // Query the Booking collection for bookings matching the user_id
    const bookings = await Booking.find({ user_id })
      .populate('event_id', 'title date location category image');

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:bookingId
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const user_id = req.user.userId;

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if the booking belongs to the user
    if (booking.user_id.toString() !== user_id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    // Restore ticket availability atomically
    await Event.findByIdAndUpdate(booking.event_id, {
      $inc: { available_tickets: booking.ticket_quantity }
    });

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

