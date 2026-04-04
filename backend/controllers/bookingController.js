import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { v4 as uuidv4 } from 'uuid';

export const createBooking = async (req, res) => {
  try {
    const { event_id, ticket_quantity } = req.body;
    const user_id = req.user.userId;

    if (!event_id || !ticket_quantity) {
      return res.status(400).json({ success: false, message: 'Please provide event_id, and ticket_quantity' });
    }

    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.available_tickets < ticket_quantity) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    const total_price = event.ticket_price * ticket_quantity;
    const bookingId = uuidv4();

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: event_id, available_tickets: { $gte: ticket_quantity } },
      { $inc: { available_tickets: -ticket_quantity } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(400).json({ success: false, message: 'Could not secure tickets. Please try again.' });
    }

    const booking = new Booking({
      user_id,
      event_id,
      ticket_quantity,
      total_price,
      eventTitle: event.title,
      bookingId
    });

    const savedBooking = await booking.save();

    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const bookings = await Booking.find({ user_id })
      .populate('event_id', 'title date location category image');

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const user_id = req.user.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user_id.toString() !== user_id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    await Event.findByIdAndUpdate(booking.event_id, {
      $inc: { available_tickets: booking.ticket_quantity }
    });

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

