# EventHub — Event Management System

Event Management System is a full-stack web application designed to help users easily discover, explore, and book tickets for various events such as conferences, workshops, concerts, and exhibitions. The platform allows event organizers to create and manage events while providing users with a simple interface to browse event details and reserve tickets.

This project demonstrates real-world web development concepts including user authentication, event management, ticket booking, and user dashboards. It is developed as a collaborative project using GitHub, where team members contribute to different modules such as authentication, event discovery, booking systems, and user dashboards.

The system is built using modern web technologies with a structured frontend and backend architecture, making it scalable and easy to maintain. The goal of this project is to practice full-stack development, team collaboration, version control using GitHub, and building a practical event management platform.

---


---

**Example events:**

* Tech conferences
* Music concerts
* Workshops
* Exhibitions
* University events

**User Actions:**

1. Browse events
2. View event details
3. Book tickets
4. Receive confirmation

---

## 1. Core System Modules

### Module 1 — Authentication System

Handles user accounts.
**Functions:** Register, Login, Logout, Profile

---

### Module 2 — Event Management Module

Stores and displays events.
**Functions:** Add events, Edit events, View details, Event listing

---

### Module 3 — Event Discovery Module

Helps users find events.
**Functions:** Browse events, Filter by category, Search by event name

---

### Module 4 — Ticket Booking Module

Allows users to book tickets.
**Functions:** Select ticket quantity, Confirm booking, Save booking in database

---

### Module 5 — User Dashboard

Shows user's activity.
**Functions:** View booked events, Booking history, Booking status

---

## 2. System Workflow

**User Flow:**

```
Home Page
   ↓
Browse Events
   ↓
View Event Details
   ↓
Book Ticket
   ↓
Booking Confirmation
   ↓
View Booking in Dashboard
```

**Organizer Flow:**

```
Login
   ↓
Create Event
   ↓
Manage Events
   ↓
View Bookings
```

---

## 3. Responsibilities for Each Member (5 Members)

### Member 1 — Authentication & User System

**Responsibilities:**

* User registration, Login/Logout, Password validation, Profile

**Pages:** Login, Register, Profile

**Backend:** User API, Authentication middleware

---

### Member 2 — Event Creation & Management

**Responsibilities:**

* Create, Edit, Delete events, Database management

**Pages:** Create Event, Manage Events

**Database Tables:** `events`, `event_categories`

---

### Member 3 — Event Discovery / Listing

**Responsibilities:**

* Display events, Search & Filter, Event cards UI

**Pages:** Home, Event Listing, Event Details

---

### Member 4 — Ticket Booking System

**Responsibilities:**

* Booking logic, Ticket selection, Booking confirmation

**Pages:** Booking, Confirmation

**Database Tables:** `bookings`, `tickets`

---

### Member 5 — User Dashboard & Booking History

**Responsibilities:**

* Dashboard, View booked events, Booking history, Cancel booking

**Pages:** Dashboard, My Bookings

---

## 4. Simplified Database Structure

**Users**

```
user_id
name
email
password
role
```

**Events**

```
event_id
title
description
date
location
category
ticket_price
available_tickets
```

**Bookings**

```
booking_id
user_id
event_id
ticket_quantity
total_price
booking_date
```

**Categories**

```
category_id
category_name
```

---

## 5. GitHub Repository Structure

```
event-management-system
│
├── README.md
├── CONTRIBUTING.md
├── .gitignore
│
├── docs
│   ├── system-architecture.md
│   └── database-design.md
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       │   ├── EventCard
│       │   ├── Navbar
│       │   ├── BookingForm
│       │   └── Footer
│       │
│       ├── pages
│       │   ├── Home
│       │   ├── Login
│       │   ├── Register
│       │   ├── Events
│       │   ├── EventDetails
│       │   ├── Dashboard
│       │   └── CreateEvent
│       │
│       └── services
│           └── api.js
│
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── bookingController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Booking.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   └── server.js
│
└── database
    └── schema.md
```

---

## 6. GitHub Branch Strategy

**Main Branches:**

```
main
develop
```

**Feature Branches:**

```
feature/auth-system
feature/event-management
feature/event-listing
feature/ticket-booking
feature/user-dashboard
```

