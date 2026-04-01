import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="glass-panel !rounded-t-[3rem] !rounded-b-none !border-b-0 mt-20 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-black text-white">
                Event<span className="text-primary-400">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover and book tickets for the best events near you. Music, Tech, Art, Education and more — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Browse Events', to: '/events' },
                { label: 'Login', to: '/login' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Music', 'Tech', 'Art', 'Education', 'Workshop'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/events?category=${cat}`}
                    className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm transition-all duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <p className="text-gray-300 text-sm font-medium">
            © 2026 EventHub. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs font-medium">
            Built with ❤️ for amazing experiences
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
