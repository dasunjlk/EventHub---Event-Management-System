import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Date must be a future date'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  ticket_price: {
    type: Number,
    required: [true, 'Ticket price is required'],
    min: [0, 'Ticket price cannot be negative']
  },
  available_tickets: {
    type: Number,
    required: [true, 'Available tickets is required'],
    min: [1, 'Must have at least 1 available ticket']
  },
  image: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Event must be associated with a creator']
  }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
