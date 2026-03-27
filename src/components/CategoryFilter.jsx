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
              ? 'bg-primary-600 border-primary-500 text-white shadow-primary-900/30 scale-[1.02]'
              : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-primary-600 hover:text-primary-300 hover:-translate-y-0.5'
          }`}
        >
          {cat === 'All' ? 'All Categories' : cat}
        </button>
      ))}
    </div>
  )
}
