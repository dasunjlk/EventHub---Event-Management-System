import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateEvent from './pages/CreateEvent'
import BookingPage from './pages/BookingPage'
import BookingSuccess from './pages/BookingSuccess'
import Dashboard from './pages/Dashboard'
import ManageEvents from './pages/ManageEvents'
import Profile from './pages/Profile'
import MyBookings from './pages/Dashboard/MyBookings'
import ProtectedRoute from './components/ProtectedRoute'

import { useEffect } from 'react'
import { authAPI } from './services/api'

function App() {
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          await authAPI.getProfile()
        } catch (error) {
          // Global interceptor handles 401 redirect/cleanup
        }
      }
    }
    validateToken()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/book/:eventId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
            <Route path="/booking-success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/manage-events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div >
    </BrowserRouter >
  )
}

export default App
