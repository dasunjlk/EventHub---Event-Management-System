import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const mapEvent = (event) => ({
  ...event,
  id: event._id || event.id,
  price: event.ticket_price,
  seats: event.available_tickets
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
      ticket_price: Number(eventData.ticket_price),
      available_tickets: Number(eventData.available_tickets)
    });
    return res.data;
  }
};

export default api;
