import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (err) {
        console.error('Error parsing user data', err)
      }
    } else {
      setUser(null)
    }
  }, [location])

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileOpen && !e.target.closest('#profile-dropdown-container')) {
        setProfileOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [profileOpen])

  // Add background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-300 px-3 py-1.5 rounded-lg ${isActive
      ? 'text-white bg-white/20 shadow-inner border border-white/10'
      : 'text-gray-200 hover:text-white hover:bg-white/10'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen
          ? 'bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-white/30 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Event<span className="text-white opacity-90 group-hover:opacity-100 transition-opacity">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/events" className={navLinkClass}>Events</NavLink>
            {localStorage.getItem('token') ? (
              <>
                {(user?.role === 'admin' || user?.role === 'organizer') && (
                  <NavLink to="/create-event" className={navLinkClass}>Create Event</NavLink>
                )}
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                {/* Profile Dropdown */}
                <div className="relative" id="profile-dropdown-container">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center justify-center w-10 h-10 glass-panel !p-0 !rounded-full hover:bg-white/20 transition-all duration-300"
                    title="Profile Menu"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-48 glass-panel !p-2 flex flex-col gap-1 shadow-2xl animate-fadeIn z-50">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <hr className="border-white/10 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all text-left"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                id="nav-login-btn"
                className="glass-btn text-sm py-2 px-6 shadow-lg shadow-white/5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-3 bg-black/40 backdrop-blur-3xl border-t border-white/10 rounded-b-3xl shadow-2xl">
          <NavLink to="/" className={navLinkClass} id="mobile-nav-home">Home</NavLink>
          <NavLink to="/events" className={navLinkClass} id="mobile-nav-events">Events</NavLink>
          {localStorage.getItem('token') ? (
            <>
              {(user?.role === 'admin' || user?.role === 'organizer') && (
                <NavLink to="/create-event" className={navLinkClass} id="mobile-nav-create-event">Create Event</NavLink>
              )}
              <NavLink to="/dashboard" className={navLinkClass} id="mobile-nav-dashboard">Dashboard</NavLink>
              <NavLink to="/profile" className={(props) => `${navLinkClass(props)} flex items-center gap-3`} id="mobile-nav-profile">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="glass-btn border-red-500/40 text-red-200 bg-red-500/20 hover:bg-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] text-sm py-3 text-center mt-2 rounded-2xl"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              id="mobile-nav-login"
              className="glass-btn text-sm py-3 text-center mt-2 w-full rounded-2xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
