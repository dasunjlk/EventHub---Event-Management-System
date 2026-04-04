import Event from '../models/Event.js';
import mongoose from 'mongoose';

const handleErrorResponse = (res, error) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource identifier',
      errors: [`Invalid format for ${error.path}`]
    });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: 'Duplicate value exception',
      errors: [`An item with that ${field} already exists`]
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Server Error',
    errors: [error.message || 'An unexpected error occurred']
  });
};

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

export const createEvent = async (req, res) => {
  try {
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

    const userId = (req.user?.userId || req.user?._id || '').toString();
    const userRole = req.user?.role || '';
    if (event.createdBy.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        errors: ['You must be the creator or an admin to update this event']
      });
    }

    delete req.body.createdBy;

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

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        errors: ['Event has already been deleted or does not exist']
      });
    }

    const userId = (req.user?.userId || req.user?._id || '').toString();
    const userRole = req.user?.role || '';
    if (event.createdBy.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        errors: ['You must be the creator or an admin to delete this event']
      });
    }

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
