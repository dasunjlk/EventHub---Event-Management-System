export default function CategoryFilter({
  categories = ['All', 'Music', 'Tech', 'Art', 'Education', 'Workshop'],
  selectedCategory = 'All',
  setSelectedCategory,
  onSelectCategory,
}) {
  const handleCategorySelect = setSelectedCategory || onSelectCategory

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 w-full">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategorySelect && handleCategorySelect(cat)}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 shadow-sm ${
            selectedCategory === cat
              ? 'bg-primary-600/80 border-primary-400/50 text-white shadow-[0_4px_16px_rgba(79,99,241,0.3)] backdrop-blur-md scale-[1.02]'
              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary-500/50 hover:text-primary-300 backdrop-blur-md hover:-translate-y-0.5'
          }`}
        >
          {cat === 'All' ? 'All Categories' : cat}
        </button>
      ))}
    </div>
  )
}
