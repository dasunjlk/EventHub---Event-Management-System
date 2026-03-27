import { Link } from 'react-router-dom'

const categoryColors = {
  Music: 'bg-pink-900/60 text-pink-300 border border-pink-800',
  Tech: 'bg-blue-900/60 text-blue-300 border border-blue-800',
  Art: 'bg-purple-900/60 text-purple-300 border border-purple-800',
  Education: 'bg-green-900/60 text-green-300 border border-green-800',
  Workshop: 'bg-amber-900/60 text-amber-300 border border-amber-800',
}

const EventCard = ({ id, title, date, location, price, image, category }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const badgeClass = categoryColors[category] || 'bg-gray-800 text-gray-300 border border-gray-700'

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
        {/* Category Badge */}
        <span className={`badge absolute top-3 left-3 ${badgeClass}`}>
          {category}
        </span>
        {/* Price Badge */}
        <span className="badge absolute top-3 right-3 bg-primary-600/90 text-white border border-primary-500/50">
          {price === 0 ? 'Free' : `LKR ${price.toLocaleString()}`}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-white font-bold text-lg leading-snug mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors duration-200">
          {title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <svg className="w-4 h-4 flex-shrink-0 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formattedDate}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">
          <svg className="w-4 h-4 flex-shrink-0 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            to={`/events/${id}`}
            id={`view-event-${id}`}
            className="btn-primary w-full text-sm py-2.5"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
