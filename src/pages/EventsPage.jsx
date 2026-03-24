import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import events from '../data/events'

const categories = ['All', 'Music', 'Tech', 'Art', 'Education', 'Workshop']

const EventsPage = () => {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All'
  )

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || e.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

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
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="events-search"
              type="text"
              placeholder="Search by title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
            />
          </div>

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
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-pill-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-900/30'
                  : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-primary-600 hover:text-primary-300'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
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

export default EventsPage
