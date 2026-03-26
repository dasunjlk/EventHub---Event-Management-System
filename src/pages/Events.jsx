import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import events from '../data/events'

const categories = ['All', 'Music', 'Tech', 'Art', 'Education', 'Workshop']

const Events = () => {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All'
  )
  const [allEvents, setAllEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data to demonstrate state usage
    const fetchEvents = () => {
      setAllEvents(events)
      setLoading(false)
    }
    const timer = setTimeout(fetchEvents, 500)
    return () => clearTimeout(timer)
  }, [])

  // Keep category in sync with query param changes (e.g., coming from Home page chips)
  useEffect(() => {
    if (categories.includes(initialCategory) && initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory, selectedCategory])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return allEvents.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(term) ||
        e.location.toLowerCase().includes(term)
      const matchesCategory =
        selectedCategory === 'All' || e.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [allEvents, search, selectedCategory])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            All Events
          </h1>
          <p className="text-gray-400 text-lg">
            Showing{' '}
            <span className="text-primary-400 font-semibold">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'event' : 'events'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <SearchBar 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by title or location..." 
          />

          {/* Category Dropdown */}
          <div className="relative sm:w-52">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            <select
              id="events-category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field pl-10 pr-8 appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-24 animate-pulse">
            <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Loading events...</h3>
            <p className="text-gray-400">Fetching latest events locally.</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter to find events.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All') }}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
