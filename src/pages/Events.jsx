import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import { eventAPI } from '../services/api'

const categories = ['All', 'Music', 'Tech', 'Art', 'Education', 'Workshop']

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const selectedCategory = searchParams.get('category') || 'All'
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await eventAPI.getAllEvents()
        setEvents(data)
      } catch (err) {
        console.error('Could not load events:', err)
        setError('Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Sync search query from URL if it changes externally
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch)
    }
  }, [searchParams])

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchQuery(val)
    const newParams = new URLSearchParams(searchParams)
    if (val) newParams.set('search', val)
    else newParams.delete('search')
    setSearchParams(newParams, { replace: true })
  }

  const handleCategoryChange = (cat) => {
    const newParams = new URLSearchParams(searchParams)
    if (cat === 'All') newParams.delete('category')
    else newParams.set('category', cat)
    setSearchParams(newParams)
  }

  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(normalizedQuery)
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [events, searchQuery, selectedCategory])

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
          <div className="text-center py-24">
            <p className="text-red-400">{error}</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
