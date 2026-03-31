import Event from '../models/Event.js';
import mongoose from 'mongoose';

// Helper for consistent error response formatting
const handleErrorResponse = (res, error) => {
  // Mongoose Validation Error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages
    });
  }

  // Mongoose CastError (e.g., Invalid format for ObjectId)
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource identifier',
      errors: [`Invalid format for ${error.path}`]
    });
  }

  // Mongoose Duplicate Key Error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: 'Duplicate value exception',
      errors: [`An item with that ${field} already exists`]
    });
  }

  // Fallback for general server errors
  return res.status(500).json({
    success: false,
    message: 'Server Error',
    errors: [error.message || 'An unexpected error occurred']
  });
};

// 1. getAllEvents
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: 'Events retrieved successfully',
      data: events
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// 2. getEventById
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID',
        errors: ['The provided ID format is invalid']
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        errors: ['No event found with this ID']
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event retrieved successfully',
      data: event
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// 3. createEvent
export const createEvent = async (req, res) => {
  try {
    // Explicit date validation to catch issues before DB layer
    if (req.body.date) {
      const parsedDate = new Date(req.body.date);
      if (isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: ['Date must be a valid future date']
        });
      }
    }

    if (req.body.available_tickets !== undefined && req.body.available_tickets < 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: ['Tickets must not be negative']
      });
    }

    if (req.body.ticket_price !== undefined && req.body.ticket_price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: ['Price must not be negative']
      });
    }

    // Inject createdBy from the authenticated user
    const eventData = {
      ...req.body,
      createdBy: req.user?.userId || req.user?._id
    };

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: savedEvent
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// 4. updateEvent
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID',
        errors: ['The provided ID format is invalid']
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        errors: ['Event does not exist or was already deleted']
      });
    }

    // Ownership & Role Validation
    const userId = (req.user?.userId || req.user?._id || '').toString();
    const userRole = req.user?.role || '';
    if (event.createdBy.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        errors: ['You must be the creator or an admin to update this event']
      });
    }

    // Prevent changing the creator maliciously
    delete req.body.createdBy;

    // Strict validation edge cases (Partial Update Aware)
    if (req.body.date) {
      const parsedDate = new Date(req.body.date);
      if (isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: ['Date must be a valid future date']
        });
      }
    }

    if (req.body.available_tickets !== undefined && req.body.available_tickets < 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: ['Ticket count cannot be negative']
      });
    }

    if (req.body.ticket_price !== undefined && req.body.ticket_price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: ['Ticket price cannot be negative']
      });
    }

    // Partial update via $set handled natively by Mongoose with runValidators
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// 5. deleteEvent
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Event ID',
        errors: ['The provided ID format is invalid']
      });
    }

    // Checking if it exists first prevents "deleting an already deleted event"
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        errors: ['Event has already been deleted or does not exist']
      });
    }

    // Ownership & Role Validation
    const userId = (req.user?.userId || req.user?._id || '').toString();
    const userRole = req.user?.role || '';
    if (event.createdBy.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        errors: ['You must be the creator or an admin to delete this event']
      });
    }

    // Using the instance allows any attached middleware ('pre delete') to fire
    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: null
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// 6. getMyEvents
export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
        errors: ['User ID not found in token']
      });
    }

    const events = await Event.find({ createdBy: userId });

    res.status(200).json({
      success: true,
      message: 'My events retrieved successfully',
      data: events
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
