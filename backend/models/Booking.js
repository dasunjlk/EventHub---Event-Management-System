import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  ticketQuantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
