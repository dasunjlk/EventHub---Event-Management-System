import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  ticket_price: {
    type: Number,
    required: true
  },
  available_tickets: {
    type: Number,
    required: true
  },
  image: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
