import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Add background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? 'text-primary-400'
        : 'text-gray-300 hover:text-white'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-primary-500 transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Event<span className="text-primary-400">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/events" className={navLinkClass}>Events</NavLink>
            <Link
              to="/login"
              id="nav-login-btn"
              className="btn-primary text-sm py-2 px-5"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-3 bg-gray-950/95 backdrop-blur-md border-t border-gray-800">
          <NavLink to="/" className={navLinkClass} id="mobile-nav-home">Home</NavLink>
          <NavLink to="/events" className={navLinkClass} id="mobile-nav-events">Events</NavLink>
          <Link
            to="/login"
            id="mobile-nav-login"
            className="btn-primary text-sm py-2 text-center mt-1"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
