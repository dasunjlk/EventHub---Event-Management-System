export default function SearchBar({ value = '', onChange = () => {}, placeholder = 'Search events...' }) {
  return (
    <div className="relative flex-1 w-full max-w-2xl mx-auto">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none drop-shadow-md"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="glass-input pl-12 text-base w-full transition-all duration-300"
      />
    </div>
  )
}
