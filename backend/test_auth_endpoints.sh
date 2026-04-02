#!/bin/bash

# Auth API Test Validation Script
API_URL="http://localhost:5000/api/auth"

echo "--- Testing Auth API ---"

# 1. Register a new user
echo "1. Testing POST /register..."
REGISTER_RES=$(curl -s -X POST $API_URL/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "Password123", "role": "user"}')

echo "Response: $REGISTER_RES"
echo ""

# 2. Login
echo "2. Testing POST /login..."
LOGIN_RES=$(curl -s -X POST $API_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Password123"}')

TOKEN=$(echo $LOGIN_RES | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "Login failed, no token returned."
else
  echo "Login successful, token secured."
fi
echo ""

# 3. Get Profile
echo "3. Testing GET /profile..."
PROFILE_RES=$(curl -s -X GET $API_URL/profile \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $PROFILE_RES"
echo ""

# 4. Update Profile
echo "4. Testing PUT /profile..."
UPDATE_RES=$(curl -s -X PUT $API_URL/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Test User"}')

echo "Response: $UPDATE_RES"
echo ""

# 5. Test Unauthorized Access
echo "5. Testing GET /profile (Unauthorized)..."
UNAUTH_RES=$(curl -s -o /dev/null -w "%{http_code}" -X GET $API_URL/profile)
echo "HTTP Status Code (Expected 401): $UNAUTH_RES"
echo ""

echo "--- Auth API Testing Complete ---"
