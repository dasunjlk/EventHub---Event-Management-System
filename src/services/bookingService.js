export const createBooking = async (bookingData) => {
  try {
    // In a real application, this would be a POST request to a backend API
    // As per instructions, we are simulating the frontend integration without the backend folder
    console.log("Mocking API call to /api/bookings with data:", bookingData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate successful booking response
    return {
      success: true,
      message: "Booking created successfully",
      booking: {
        bookingId: "BKG-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        bookingDate: new Date().toISOString(),
        ...bookingData
      }
    };
  } catch (error) {
    console.error("Booking error:", error);
    throw new Error("Failed to create booking");
  }
};
