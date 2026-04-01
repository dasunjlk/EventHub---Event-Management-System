import api from './api';

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error("Booking error:", error);
    throw new Error(error.response?.data?.message || "Failed to create booking");
  }
};

export const getUserBookings = async () => {
  try {
    const response = await api.get('/bookings/user');

    if (Array.isArray(response.data?.bookings)) {
      return response.data.bookings;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch bookings");
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw new Error(error.response?.data?.message || "Failed to cancel booking");
  }
};
