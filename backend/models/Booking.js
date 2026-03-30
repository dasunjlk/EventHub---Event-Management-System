import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  ticket_quantity: {
    type: Number,
    required: true
  },
  total_price: {
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
  booking_date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
