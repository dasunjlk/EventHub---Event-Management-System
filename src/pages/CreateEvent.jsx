import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI } from '../services/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    ticket_price: '',
    available_tickets: '',
    image: ''
  });

  const [error, setError] = useState(null);

  const categories = ['Music', 'Tech', 'Art', 'Education', 'Workshop'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { title, description, date, location, category, ticket_price, available_tickets } = formData;
    return title.trim() && description.trim() && date && location.trim() && category && ticket_price !== '' && available_tickets !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError(null);
    try {
      await eventAPI.createEvent(formData);
      navigate('/events');
    } catch (err) {
      setError(err.message || 'Failed to create event');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl p-8 sm:p-10 space-y-8 bg-gray-900/50 backdrop-blur-md border border-blue-500 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Create New Event</h2>
          <p className="mt-3 text-lg text-gray-400">Host an amazing experience for your audience</p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-200 bg-red-900/50 border border-red-800 rounded-xl" role="alert">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Event Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Awesome Tech Conference 2026"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="input-field w-full resize-none"
                placeholder="Tell attendees what to expect..."
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Date *</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="input-field w-full"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="City, Venue, or Online"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input-field w-full bg-gray-800 text-white"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Ticket Price (LKR) *</label>
              <input
                type="number"
                name="ticket_price"
                value={formData.ticket_price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input-field w-full"
                placeholder="0.00"
              />
            </div>

            {/* Available Tickets */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Available Tickets *</label>
              <input
                type="number"
                name="available_tickets"
                value={formData.available_tickets}
                onChange={handleChange}
                required
                min="1"
                className="input-field w-full"
                placeholder="100"
              />
            </div>

            {/* Event Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Image URL (Optional)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className="w-full btn-primary py-3 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed mt-8 transition-opacity duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
