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
