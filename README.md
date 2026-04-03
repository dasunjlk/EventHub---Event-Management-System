# EventHub - Event Management System

EventHub is a full-stack event discovery and booking platform built with React, Vite, Express, and MongoDB. Users can browse events, register accounts, book tickets, and review their booking history, while organizers can create and manage their own events.

This repository currently contains:

- A Vite + React frontend in the project root
- An Express + MongoDB backend inside `backend/`
- Seed data for local development and demos

## Features

- Browse public event listings and featured events
- Search events by title and filter by category
- View detailed event pages
- Register and log in with JWT-based authentication
- Choose between attendee and organizer accounts during signup
- Book tickets through a simulated checkout flow
- View booking history, totals, and upcoming events in a dashboard
- Create, edit, and delete events as an organizer or admin
- Restrict event management routes by role and ownership

## Tech Stack

- Frontend: React 18, React Router, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JSON Web Tokens
- Authentication: JWT stored in `localStorage`
- Database: MongoDB Atlas or local MongoDB

## Project Structure

```text
EventHub---Event-Management-System/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- package.json
|   |-- seed.js
|   `-- server.js
|-- public/
|-- src/
|   |-- components/
|   |-- pages/
|   |   `-- Dashboard/
|   `-- services/
|-- index.html
|-- package.json
`-- README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB connection string

## Getting Started

### 1. Install dependencies

Install the frontend/root dependencies:

```bash
npm install
```

Install the backend dependencies:

```bash
cd backend
npm install
cd ..
```

### 2. Configure environment variables

Create `backend/.env` with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000
```

`backend/server.js` always loads `backend/.env`, so keep the backend environment file inside the `backend` folder.

### 3. Start the backend API

From the project root:

```bash
npm start
```

Or from the backend folder:

```bash
cd backend
npm start
```

The API runs on `http://localhost:5000` by default.

### 4. Start the frontend

In a second terminal, from the project root:

```bash
npm run dev
```

Vite usually serves the frontend at `http://localhost:5173`.

## Seed Demo Data

To populate the database with sample users and events:

```bash
cd backend
node seed.js
```

Important:

- The seed script clears existing users and events before inserting demo data
- It creates 8 sample events
- It creates one admin account for local testing:

```text
Email: test@example.com
Password: password123
Role: admin
```

## Roles

- `user`: browse events, book tickets, view dashboard
- `organizer`: all user actions plus create and manage their own events
- `admin`: organizer permissions plus permission to manage any event

## API Overview

Base URL:

```text
http://localhost:5000/api
```

Main routes:

- `POST /auth/register` - create a new account
- `POST /auth/login` - authenticate and receive a token
- `GET /auth/profile` - fetch the logged-in user profile
- `PUT /auth/profile` - update name, email, or password
- `GET /events` - fetch all events
- `GET /events/:id` - fetch one event
- `GET /events/my-events` - fetch events created by the logged-in organizer/admin
- `POST /events` - create an event
- `PUT /events/:id` - update an event
- `DELETE /events/:id` - delete an event
- `POST /bookings` - create a booking
- `GET /bookings/user` - fetch current user bookings
- `DELETE /bookings/:bookingId` - cancel a booking

## Available Commands

From the project root:

```bash
npm run dev      # start the Vite frontend
npm start        # start the backend server
npm run build    # build the frontend for production
npm run preview  # preview the production frontend build
```

From `backend/`:

```bash
npm start        # start the backend server
node seed.js     # seed sample data
```

## Development Notes

- The frontend API base URL is currently hardcoded to `http://localhost:5000/api`
- If you change the backend port, also update the frontend service configuration in `src/services/api.js` and `src/services/eventService.js`
- The checkout screen is a simulated payment flow for demo purposes; no external payment gateway is integrated yet

## Future Improvements

- Move API URLs to environment variables
- Add backend hot reload with a local `nodemon` dependency
- Add automated tests for frontend and backend flows
- Integrate a real payment provider
- Add image upload support instead of URL-only event images
