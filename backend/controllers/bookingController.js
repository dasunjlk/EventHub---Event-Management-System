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
<<<<<<< HEAD
=======

    // Check for existing active booking from the same user for this event
    const existingBooking = await Booking.findOne({ user_id, event_id, status: 'active' });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'You already have an active booking for this event.' });
    }

    // Generate a unique bookingId using uuid
>>>>>>> 2df673fcf720fb673c883d9e493ff80f4d808b6c
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
      .populate('event_id', 'title date location category image price ticket_price available_tickets');

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

<<<<<<< HEAD
=======
    // Prevent double cancellation
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    // Restore ticket availability atomically
>>>>>>> 2df673fcf720fb673c883d9e493ff80f4d808b6c
    await Event.findByIdAndUpdate(booking.event_id, {
      $inc: { available_tickets: booking.ticket_quantity }
    });

<<<<<<< HEAD
    await Booking.findByIdAndDelete(bookingId);
=======
    // Soft update status
    booking.status = 'cancelled';
    await booking.save();
>>>>>>> 2df673fcf720fb673c883d9e493ff80f4d808b6c

    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a booking quantity
// @route   PUT /api/bookings/:bookingId
// @access  Private
export const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { new_ticket_quantity } = req.body;
    const user_id = req.user.userId;

    if (!new_ticket_quantity || new_ticket_quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid ticket quantity' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user_id.toString() !== user_id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
    }

    if (booking.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Cannot update cancelled booking' });
    }

    const diff = new_ticket_quantity - booking.ticket_quantity;
    if (diff === 0) {
      return res.status(200).json({ success: true, booking });
    }

    const event = await Event.findById(booking.event_id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Atomic update of event
    let updatedEvent;
    if (diff > 0) {
      if (event.available_tickets < diff) {
        return res.status(400).json({ success: false, message: 'Not enough tickets available' });
      }
      updatedEvent = await Event.findOneAndUpdate(
        { _id: event._id, available_tickets: { $gte: diff } },
        { $inc: { available_tickets: -diff } },
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(400).json({ success: false, message: 'Could not secure additional tickets. Please try again.' });
      }
    } else {
      updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { $inc: { available_tickets: Math.abs(diff) } },
        { new: true }
      );
    }

    booking.ticket_quantity = new_ticket_quantity;
    booking.total_price = event.ticket_price * new_ticket_quantity;
    await booking.save();

    res.status(200).json({ success: true, message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

