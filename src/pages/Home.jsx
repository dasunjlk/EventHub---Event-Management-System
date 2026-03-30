import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import events from '../data/events'

const categories = [
  {
    name: 'Music',
    icon: '🎵',
    color: 'from-pink-600/20 to-pink-900/20 border-pink-800/50 hover:border-pink-600',
    textColor: 'text-pink-300',
  },
  {
    name: 'Tech',
    icon: '💻',
    color: 'from-blue-600/20 to-blue-900/20 border-blue-800/50 hover:border-blue-600',
    textColor: 'text-blue-300',
  },
  {
    name: 'Art',
    icon: '🎨',
    color: 'from-purple-600/20 to-purple-900/20 border-purple-800/50 hover:border-purple-600',
    textColor: 'text-purple-300',
  },
  {
    name: 'Education',
    icon: '📚',
    color: 'from-green-600/20 to-green-900/20 border-green-800/50 hover:border-green-600',
    textColor: 'text-green-300',
  },
  {
    name: 'Workshop',
    icon: '🔧',
    color: 'from-amber-600/20 to-amber-900/20 border-amber-800/50 hover:border-amber-600',
    textColor: 'text-amber-300',
  },
]

const featuredEvents = events.slice(0, 6)

const Home = () => {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState('')

  const handleCreateEventClick = (e) => {
    if (!localStorage.getItem('token')) {
      e.preventDefault()
      setAuthError('Please login to host events')
      setTimeout(() => setAuthError(''), 3000)
    }
  }
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-800/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-600/10 via-transparent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 animate-slide-up">
          {/* Badge */}
          <span className="badge !bg-primary-900/40 !border-primary-500/50 !text-primary-300 px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            10,000+ events listed across Sri Lanka
          </span>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Discover{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Amazing Events
            </span>
            <br />
            Near You
          </h1>

          {/* Subtext */}
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Find and book tickets for the best events. Music festivals, tech conferences, art exhibitions and more. All in one place.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10 w-full">
            <SearchBar placeholder="Search events, artists, venues..." />
            <Link to="/events" id="hero-browse-btn" className="btn-primary whitespace-nowrap">
              Browse Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
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

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0c10] to-transparent pointer-events-none" />
      </section>

      {/* ── Categories Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-heading">Browse by Category</h2>
          <p className="section-subheading">Find events that match your interests</p>
        </div>

        <div className="flex justify-center mt-8">
          <CategoryFilter
            categories={['Music', 'Tech', 'Art', 'Education', 'Workshop']}
            onSelectCategory={(cat) => navigate(`/events?category=${cat}`)}
          />
        </div>
      </section>

      {/* ── Featured Events Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-heading">Featured Events</h2>
            <p className="section-subheading">Hand-picked events you'll love</p>
          </div>
          <Link
            to="/events"
            id="see-all-events-btn"
            className="btn-outline hidden sm:inline-flex text-sm py-2 px-5"
          >
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-10 text-center sm:hidden">
          <Link to="/events" className="btn-outline">
            See All Events
          </Link>
        </div>
      </section>

      {/* ── Host Event CTA ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10">
        <div className="glass-panel p-10 sm:p-14 group text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-accent-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Want to host an event?</h2>
            <p className="text-gray-400 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Create and manage your own events easily and reach a wider audience.
            </p>
            <div className="relative inline-flex flex-col items-center">
              <Link 
                to="/create-event" 
                onClick={handleCreateEventClick}
                className="btn-primary py-3.5 px-8 text-lg font-bold shadow-lg hover:shadow-primary-500/25 hover:-translate-y-1 transition-all duration-300"
              >
                Create Event
              </Link>
              {authError && (
                <div className="absolute top-full mt-3 px-4 py-2 bg-red-900/90 border border-red-800 text-red-200 text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap animate-fadeIn z-20">
                  {authError}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto mb-20 glass-panel !border-primary-500/50 !shadow-[0_8px_32px_rgba(79,99,241,0.4)] relative">
        <div className="absolute inset-0 bg-primary-600/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 to-accent-500/50 mix-blend-overlay" />
        <div className="relative z-10 px-8 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 drop-shadow-md">
            Ready to experience something amazing?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto drop-shadow-sm">
            Join thousands of people discovering great events every day.
          </p>
          <Link to="/events" id="cta-browse-btn" className="glass-button px-8 py-3.5 text-lg border-white/40">
            Explore All Events
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
