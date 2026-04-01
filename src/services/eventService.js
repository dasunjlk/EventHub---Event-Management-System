import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

// Helper to get auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  return {};
};

// Error handler helper
const handleError = (error) => {
  // If the backend returned a custom error message
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.errors && data.errors.length > 0) {
      throw new Error(data.errors.join(' | ')); // Show specific errors
    }
    throw new Error(data.message || 'An error occurred with the request');
  }
  // If no response was received (e.g., network error)
  throw new Error(error.message || 'Network Error');
};

const eventService = {
  // Get all events
  getEvents: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get my events exclusively
  getMyEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/my-events`, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get single event by ID
  getEventById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Create new event
  createEvent: async (data) => {
    try {
      const response = await axios.post(API_URL, data, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Update event
  updateEvent: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export default eventService;
