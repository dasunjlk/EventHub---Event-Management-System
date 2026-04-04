import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import { eventAPI } from '../services/api'

const Home = () => {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState('')
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [featuredError, setFeaturedError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchFeaturedEvents = async () => {
    setFeaturedLoading(true)
    setFeaturedError('')

    try {
      const events = await eventAPI.getAllEvents()
      setFeaturedEvents((events || []).slice(0, 6))
    } catch (err) {
      console.error('Could not load featured events:', err)
      setFeaturedEvents([])
      setFeaturedError('Featured events are unavailable right now. Please try again.')
    } finally {
      setFeaturedLoading(false)
    }
  }

  useEffect(() => {
    fetchFeaturedEvents()
  }, [])

  const handleCreateEventClick = (e) => {
    if (!localStorage.getItem('token')) {
      e.preventDefault()
      setAuthError('Please login to host events')
      setTimeout(() => setAuthError(''), 3000)
      return
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      if (currentUser.role !== 'organizer' && currentUser.role !== 'admin') {
        e.preventDefault()
        setAuthError('Only organizers or admins can create events')
        setTimeout(() => setAuthError(''), 3000)
      }
    } catch {
      e.preventDefault()
      setAuthError('Please login again to continue')
      setTimeout(() => setAuthError(''), 3000)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    const params = new URLSearchParams()

    if (trimmed) {
      params.set('search', trimmed)
    }

    const queryString = params.toString()
    navigate(queryString ? `/events?${queryString}` : '/events')
  }

  const handleCategorySelect = (category) => {
    const params = new URLSearchParams()
    if (category && category !== 'All') {
      params.set('category', category)
    }

    const queryString = params.toString()
    navigate(queryString ? `/events?${queryString}` : '/events')
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 animate-slide-up">
          <span className="glass-badge mb-8 px-4 py-1.5 text-sm gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            10,000+ events listed across Sri Lanka
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
            Discover{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 animate-gradient-x">
              Amazing Events
            </span>
            <br />
            <span className="text-gray-200">Near You</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Find and book tickets for the best events. Music festivals, tech conferences, art exhibitions and more. All in one place.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10 w-full"
          >
            <SearchBar
              placeholder="Search events, artists, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" id="hero-browse-btn" className="glass-btn whitespace-nowrap">
              Browse Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: '10K+', label: 'Events' },
              { value: '50K+', label: 'Happy Attendees' },
              { value: '500+', label: 'Organizers' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-px max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-heading">Browse by Category</h2>
          <p className="section-subheading">Find events that match your interests</p>
        </div>

        <div className="flex justify-center mt-8">
          <CategoryFilter
            categories={['Music', 'Tech', 'Art', 'Education', 'Workshop']}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-heading">Featured Events</h2>
            <p className="section-subheading">Hand-picked events you'll love</p>
          </div>
          <Link
            to="/events"
            id="see-all-events-btn"
            className="glass-btn hidden sm:inline-flex text-sm py-2 px-6"
          >
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`featured-skeleton-${index}`} className="glass-panel !p-0 overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-white/10" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                  <div className="h-4 w-2/3 bg-white/10 rounded" />
                  <div className="h-10 w-full bg-white/10 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredError ? (
          <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
            <p className="text-red-300 text-lg mb-5">{featuredError}</p>
            <button onClick={fetchFeaturedEvents} className="glass-btn px-8">
              Retry
            </button>
          </div>
        ) : featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">No featured events right now</h3>
            <p className="text-gray-300 mb-6">Browse all events to discover what is happening next.</p>
            <Link to="/events" className="glass-btn px-8">
              Browse All Events
            </Link>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link to="/events" className="glass-btn">
            See All Events
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10">
        <div className="glass-panel p-10 sm:p-14 relative overflow-hidden group text-center">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Want to host an event?</h2>
            <p className="text-gray-400 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Create and manage your own events easily and reach a wider audience.
            </p>
            <div className="relative inline-flex flex-col items-center">
              <Link
                to="/create-event"
                onClick={handleCreateEventClick}
                className="glass-btn py-3.5 px-8 text-lg font-bold w-auto border-white/30"
              >
                Create Event
              </Link>
              {authError && (
                <div className="absolute top-full mt-3 px-4 py-2 glass-panel bg-red-500/10 border-red-500/30 text-red-200 text-sm font-semibold shadow-[0_0_15px_rgba(239,68,68,0.1)] whitespace-nowrap animate-fadeIn z-20">
                  {authError}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto mb-20 rounded-[2rem] overflow-hidden relative glass-panel !p-0 border-white/20">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="relative px-8 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 drop-shadow-md">
            Ready to experience something amazing?
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-xl mx-auto drop-shadow-sm font-medium">
            Join thousands of people discovering great events every day.
          </p>
          <Link to="/events" id="cta-browse-btn" className="glass-btn px-8 py-3.5 text-lg font-bold w-auto border-white/40">
            Explore All Events
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
