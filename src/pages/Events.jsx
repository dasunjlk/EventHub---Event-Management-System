import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import { eventAPI } from '../services/api'

const categories = ['All', 'Music', 'Tech', 'Art', 'Education', 'Workshop']

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const categoryFromUrl = searchParams.get('category') || 'All'
  const selectedCategory = categories.includes(categoryFromUrl) ? categoryFromUrl : 'All'

  const fetchEvents = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await eventAPI.getAllEvents()
      setEvents(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Could not load events:', err)
      setError('Failed to load events. Please try again.')
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch)
    }

    const urlCategory = searchParams.get('category')
    if (urlCategory && !categories.includes(urlCategory)) {
      const cleanedParams = new URLSearchParams(searchParams)
      cleanedParams.delete('category')
      setSearchParams(cleanedParams, { replace: true })
    }
  }, [searchParams, searchQuery, setSearchParams])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    const newParams = new URLSearchParams(searchParams)
    const trimmed = value.trim()

    if (trimmed) {
      newParams.set('search', trimmed)
    } else {
      newParams.delete('search')
    }

    setSearchParams(newParams, { replace: true })
  }

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams)

    if (category === 'All') {
      newParams.delete('category')
    } else {
      newParams.set('category', category)
    }

    setSearchParams(newParams, { replace: true })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSearchParams({}, { replace: true })
  }

  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return events.filter((event) => {
      const eventTitle = (event.title || '').toLowerCase()
      const eventCategory = event.category || ''

      const matchesSearch = !normalizedQuery || eventTitle.includes(normalizedQuery)
      const matchesCategory = selectedCategory === 'All' || eventCategory === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [events, searchQuery, selectedCategory])

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery.trim() !== ''

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            All Events
          </h1>
          <p className="text-gray-300 text-lg font-medium drop-shadow-sm">
            Showing{' '}
            <span className="text-white font-bold drop-shadow-md">{filteredEvents.length}</span>{' '}
            {filteredEvents.length === 1 ? 'event' : 'events'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search events by title..."
          />
        </div>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </div>

        {loading ? (
          <div className="text-center py-24">
            <p className="text-gray-400">Loading events...</p>
          </div>
        ) : error ? (
          <div className="glass-panel p-8 text-center max-w-2xl mx-auto">
            <p className="text-red-300 text-lg mb-5">{error}</p>
            <button onClick={fetchEvents} className="glass-btn px-8">
              Try Again
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-10 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              {hasActiveFilters ? 'No events match your filters' : 'No events available right now'}
            </h3>
            <p className="text-gray-300 mb-6">
              {hasActiveFilters
                ? 'Try another search term or category.'
                : 'Please check back soon for new event listings.'}
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="glass-btn px-8">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
