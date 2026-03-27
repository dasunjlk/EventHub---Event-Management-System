import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to attach JWT token
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

export const authAPI = {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },
  getProfile: async () => {
    return api.get('/auth/profile');
  }
};

export const eventAPI = {
  getAllEvents: async () => {
    const res = await api.get('/events');
    // Map backend `_id` to `id` for frontend consistency if needed
    return res.data.map(event => ({
      ...event,
      id: event._id,
      price: event.ticket_price
    }));
  },
  createEvent: async (eventData) => {
    const res = await api.post('/events', {
      ...eventData,
      ticket_price: Number(eventData.ticket_price),
      available_tickets: Number(eventData.available_tickets)
    });
    return res.data;
  }
};

export default api;
