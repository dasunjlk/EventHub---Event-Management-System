// Mock API service for Authentication
// Replace these with actual axios calls when backend is ready

export const authAPI = {
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Dummy data verification
        if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
          resolve({
            data: {
              token: 'mock-jwt-token-12345',
              user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' }
            }
          });
        } else {
          reject({ response: { data: { message: 'Invalid email or password. Use test@example.com / password123' } } });
        }
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { message: 'Registration successful' }
        });
      }, 1000);
    });
  }
};

const BASE_URL = 'http://localhost:5000/api';

export const eventAPI = {
  getAllEvents: async () => {
    const res = await fetch(`${BASE_URL}/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    const data = await res.json();
    return data.map(event => ({
      ...event,
      id: event._id,
      price: event.ticket_price
    }));
  },
  createEvent: async (eventData) => {
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...eventData,
        ticket_price: Number(eventData.ticket_price),
        available_tickets: Number(eventData.available_tickets)
      }),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
  }
};
