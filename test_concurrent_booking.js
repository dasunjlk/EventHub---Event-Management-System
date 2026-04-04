import axios from 'axios';

/**
 * Script to test concurrent booking and race conditions.
 * Usage:
 * 1. Setup an event in your DB and grab its Event ID.
 * 2. Get a valid JWT token for a test user.
 * 3. Update EVENT_ID and TEST_TOKEN below.
 * 4. Run `node test_concurrent_booking.js`.
 */

const API_URL = 'http://localhost:5000/api';
const TEST_TOKEN = 'YOUR_TEST_JWT_TOKEN_HERE';
const EVENT_ID = 'YOUR_TEST_EVENT_ID_HERE';

async function testConcurrentBookings() {
  console.log('Starting concurrent booking test...');
  console.log('Sending 5 simultaneous booking requests for the same event and user...\n');
  
  const attempts = 5;
  const requests = [];

  for (let i = 0; i < attempts; i++) {
    const req = axios.post(
      `${API_URL}/bookings`,
      { event_id: EVENT_ID, ticket_quantity: 1 },
      { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
    ).then(res => {
      console.log(`[Attempt ${i + 1}] Success: Booking created (${res.data?.booking?._id || 'OK'})`);
      return { success: true };
    }).catch(err => {
      const msg = err.response?.data?.message || err.message;
      console.log(`[Attempt ${i + 1}] Rejected: ${msg}`);
      return { success: false };
    });

    requests.push(req);
  }

  const results = await Promise.all(requests);
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;

  console.log('\n--- TEST RESULTS ---');
  console.log(`Total Attempts: ${attempts}`);
  console.log(`Successful Bookings: ${successCount} (Should ideally be 1 for the same user)`);
  console.log(`Failed Bookings: ${failureCount} (Should ideally be ${attempts - 1})`);
  
  if (successCount > 1) {
    console.log('\n❌ WARNING: The system allowed multiple active bookings for the same user!');
    console.log('Race condition bypass detected or duplicate booking prevention failed.');
  } else if (successCount === 1) {
    console.log('\n✅ SUCCESS: The system successfully blocked duplicate bookings and handled the race condition gracefully.');
  } else {
    console.log('\n⚠️ WARNING: All bookings failed. Ensure your EVENT_ID and TEST_TOKEN are correct.');
  }
}

testConcurrentBookings();
