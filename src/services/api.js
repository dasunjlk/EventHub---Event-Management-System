import axios from 'axios';
import { normalizeEventImageUrl } from '../utils/eventImages';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const mapEvent = (event) => ({
  ...event,
  id: event._id || event.id,
  image: normalizeEventImageUrl(event.image),
  price: event.ticket_price,
  seats: event.available_tickets
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },
  getProfile: async () => {
    return api.get('/auth/profile');
  },
  updateProfile: async (profileData) => {
    return api.put('/auth/profile', profileData);
  }
};

export const eventAPI = {
  getAllEvents: async () => {
    const res = await api.get('/events');
    const eventsArray = res.data.data || res.data;
    return eventsArray.map(mapEvent);
  },
  getEventById: async (id) => {
    const res = await api.get(`/events/${id}`);
    const eventObj = res.data.data || res.data;
    return mapEvent(eventObj);
  },
  createEvent: async (eventData) => {
    const res = await api.post('/events', {
      ...eventData,
      image: normalizeEventImageUrl(eventData.image),
      ticket_price: Number(eventData.ticket_price),
      available_tickets: Number(eventData.available_tickets)
    });
    return res.data;
  }
};

export default api;
