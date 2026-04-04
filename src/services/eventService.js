import axios from 'axios';
import { normalizeEventImageUrl } from '../utils/eventImages';

const API_URL = 'http://localhost:5000/api/events';

const mapEvent = (event) => ({
  ...event,
  id: event._id || event.id,
  image: normalizeEventImageUrl(event.image)
});

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

const handleError = (error) => {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.errors && data.errors.length > 0) {
      throw new Error(data.errors.join(' | '));
    }
    throw new Error(data.message || 'An error occurred with the request');
  }
  throw new Error(error.message || 'Network Error');
};

const eventService = {
  getEvents: async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.data || response.data;
      return Array.isArray(data) ? data.map(mapEvent) : mapEvent(data);
    } catch (error) {
      handleError(error);
    }
  },

  getMyEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/my-events`, getAuthHeaders());
      const data = response.data.data || response.data;
      return Array.isArray(data) ? data.map(mapEvent) : [];
    } catch (error) {
      handleError(error);
    }
  },

  getEventById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const data = response.data.data || response.data;
      return mapEvent(data);
    } catch (error) {
      handleError(error);
    }
  },

  createEvent: async (data) => {
    try {
      const response = await axios.post(API_URL, {
        ...data,
        image: normalizeEventImageUrl(data.image)
      }, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  updateEvent: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        ...data,
        image: normalizeEventImageUrl(data.image)
      }, getAuthHeaders());
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

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
