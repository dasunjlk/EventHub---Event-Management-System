import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { userId, eventId, ticketQuantity, totalPrice, eventTitle } = req.body;

    const bookingId = "BKG-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const booking = new Booking({
      userId,
      eventId,
      ticketQuantity,
      totalPrice,
      eventTitle,
      bookingId,
      bookingDate: Date.now()
    });

    const createdBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: createdBooking
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
