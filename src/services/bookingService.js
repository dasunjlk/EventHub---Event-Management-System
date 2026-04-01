import api from './api';

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error("Booking error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to create booking");
  }
};

export const getUserBookings = async () => {
    try {
        const response = await api.get('/bookings/user');
        
        // Robust response parsing
        // Support: response.data.bookings, response.data (direct array), or response.bookings
        if (response.data && response.data.bookings) {
            return response.data.bookings;
        }
        if (Array.isArray(response.data)) {
            return response.data;
        }
        if (response.bookings) {
            return response.bookings;
        }
        
        return [];
    } catch (error) {
        console.error("Fetch bookings error:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
}
