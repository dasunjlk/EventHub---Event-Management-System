import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import events from '../data/events'

const categoryColors = {
  Music: 'glass-badge border-purple-500/30 text-purple-200 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
  Tech: 'glass-badge border-blue-500/30 text-blue-200 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  Art: 'glass-badge border-pink-500/30 text-pink-200 bg-pink-500/10 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
  Education: 'glass-badge border-green-500/30 text-green-200 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
  Workshop: 'glass-badge border-orange-500/30 text-orange-200 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
}

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentEvent, setCurrentEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const found = events.find((e) => e.id === Number(id))
      setCurrentEvent(found || null)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <div className="text-7xl mb-6">:(</div>
        <h1 className="text-3xl font-black text-white mb-3">Event not found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          The event you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/events" className="glass-btn">
          Back to Events
        </Link>
      </div>
    )
  }

  const {
    title, date, time, location, category, price,
    image, description, organizer, seats,
  } = currentEvent

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const badgeClass = categoryColors[category] || 'glass-badge border-white/20 text-white'

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`

  const related = events.filter((e) => e.category === category && e.id !== currentEvent.id).slice(0, 3)

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 pt-6">
        <button
          id="back-btn"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div className="relative overflow-hidden glass-panel !padding-0 aspect-[21/9] mb-8 shadow-2xl !p-0 border-white/20">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Category badge on image */}
          <span className={`absolute top-5 left-5 text-sm px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full shadow-lg`}>
            {category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Left: Main Info --- */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
              {title}
            </h1>

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Date */}
              <div className="flex items-start gap-3 glass-panel p-4">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-0.5">Date & Time</p>
                  <p className="text-white font-semibold text-sm">{formattedDate}</p>
                  {time && <p className="text-gray-400 text-sm">{time}</p>}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 glass-panel p-4">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-white font-semibold text-sm">{location}</p>
                </div>
              </div>

              {/* Organizer */}
              {organizer && (
                <div className="flex items-start gap-3 glass-panel p-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-0.5">Organizer</p>
                    <p className="text-white font-semibold text-sm">{organizer}</p>
                  </div>
                </div>
              )}

              {/* Seats */}
              {seats && (
                <div className="flex items-start gap-3 glass-panel p-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-0.5">Capacity</p>
                    <p className="text-white font-semibold text-sm">{seats} seats</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed text-base">
                {description}
              </p>
            </div>

            {/* Show on Map Button */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="show-map-btn"
              className="glass-btn inline-flex mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Show Location on Map
            </a>
          </div>

          {/* --- Right: Ticket Box --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-panel p-6 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-1">Price per ticket</p>
                <p className="text-4xl font-black text-white">
                  {price === 0 ? (
                    <span className="text-green-400">Free</span>
                  ) : (
                    <>
                      <span className="text-2xl text-gray-400 font-normal">LKR </span>
                      {price.toLocaleString()}
                    </>
                  )}
                </p>
              </div>

              <div className="space-y-3 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant confirmation
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Digital ticket via email
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure checkout
                </div>
              </div>

              <button
                id="book-ticket-btn"
                onClick={() => navigate(`/book/${currentEvent.id}`)}
                className="glass-btn w-full text-base py-3.5"
              >
                Book Ticket
              </button>

              <p className="text-center text-gray-600 text-xs mt-4">
                No action performed - UI only
              </p>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              More {category} Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((e) => (
                <EventCard key={e.id} {...e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetails
