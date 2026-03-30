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
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 shadow-sm ${
            selectedCategory === cat
              ? 'bg-white/20 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-[1.02] backdrop-blur-md'
              : 'bg-white/5 border-white/10 text-gray-300 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:text-white hover:-translate-y-0.5'
          }`}
        >
          {cat === 'All' ? 'All Categories' : cat}
        </button>
      ))}
    </div>
  )
}
