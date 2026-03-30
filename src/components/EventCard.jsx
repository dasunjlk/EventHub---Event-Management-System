import { Link } from 'react-router-dom'

const categoryColors = {
  Music: 'glass-badge border-purple-500/30 text-purple-200 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
  Tech: 'glass-badge border-blue-500/30 text-blue-200 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  Art: 'glass-badge border-pink-500/30 text-pink-200 bg-pink-500/10 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
  Education: 'glass-badge border-green-500/30 text-green-200 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
  Workshop: 'glass-badge border-orange-500/30 text-orange-200 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
}

const EventCard = ({ id, title, date, location, price, image, category }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const badgeClass = categoryColors[category] || 'glass-badge border-white/20 text-white'

  return (
    <div className="glass-panel group flex flex-col hover:scale-[1.01] !p-0">
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
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-3 py-1 text-sm font-bold shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
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
            className="glass-btn w-full text-sm py-2.5"
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
