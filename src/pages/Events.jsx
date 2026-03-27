import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import dummyEvents from '../data/events'

const categories = ['All', 'Music', 'Tech', 'Art', 'Education', 'Workshop']

const Events = () => {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All'
  )
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(dummyEvents)
      setLoading(false)
    }, 250)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (categories.includes(initialCategory) && selectedCategory !== initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory, selectedCategory])

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
          <p className="text-gray-400 text-lg">
            Showing{' '}
            <span className="text-primary-400 font-semibold">{filteredEvents.length}</span>{' '}
            {filteredEvents.length === 1 ? 'event' : 'events'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title..."
          />
        </div>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {loading ? (
          <div className="text-center py-24">
            <p className="text-gray-400">Loading...</p>
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
