import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const categories = ['Music', 'Tech', 'Art', 'Education', 'Workshop'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      
      const formattedData = data.map(ev => ({
        ...ev,
        id: ev._id || ev.id
      }));
      setEvents(formattedData);
      setError(null);
    } catch (err) {
      setError('Could not load events. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete event');
        setEvents(events.filter(event => event.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    // Format date properly for the datetime-local input field
    let formattedDate = event.date || '';
    if (formattedDate.includes('Z')) {
      formattedDate = new Date(formattedDate).toISOString().slice(0, 16);
    }
    
    setEditFormData({ 
      ...event,
      date: formattedDate
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editFormData,
        ticket_price: Number(editFormData.ticket_price),
        available_tickets: Number(editFormData.available_tickets)
      };

      const res = await fetch(`http://localhost:5000/api/events/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to update event');
      const updatedEvent = await res.json();
      
      const formattedUpdatedEvent = {
        ...updatedEvent,
        id: updatedEvent._id || updatedEvent.id
      };

      setEvents(events.map(event => event.id === editingId ? formattedUpdatedEvent : event));
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex justify-center items-center">
        <div className="text-xl font-bold text-primary-400 animate-pulse">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header Section */}
        <div className="text-center glass-panel shadow-2xl border-white/20 p-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">Manage Events</h2>
          <p className="mt-3 text-lg text-gray-200">View, update, or remove events that you have created.</p>
        </div>

        {error && (
          <div className="glass-panel p-4 text-sm text-red-200 bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] text-center" role="alert">
            {error}
          </div>
        )}

        {!error && events.length === 0 ? (
          /* Empty State */
          <div className="text-center p-12 glass-panel shadow-2xl border-white/20">
            <div className="text-5xl mb-4 drop-shadow-md">🗓️</div>
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">No events available</h3>
            <p className="text-gray-300 mb-6 border-white/20">You haven't created any events yet.</p>
            <Link to="/create-event" className="glass-btn inline-block">Create New Event</Link>
          </div>
        ) : (
          /* Event List */
          <div className="space-y-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="glass-panel p-6 shadow-2xl transition-all duration-300 hover:border-white/30"
              >
                {editingId === event.id ? (
                  /* Inline Edit Form */
                  <form onSubmit={saveEdit} className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Event Title *</label>
                        <input type="text" name="title" value={editFormData.title || ''} onChange={handleEditChange} required className="input-field w-full" />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
                        <textarea name="description" value={editFormData.description || ''} onChange={handleEditChange} required rows="3" className="input-field w-full resize-none"></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Date *</label>
                        <input type="datetime-local" name="date" value={editFormData.date || ''} onChange={handleEditChange} required className="input-field w-full" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Location *</label>
                        <input type="text" name="location" value={editFormData.location || ''} onChange={handleEditChange} required className="input-field w-full" />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                        <select name="category" value={editFormData.category || ''} onChange={handleEditChange} required className="input-field w-full text-white [&>option]:bg-black">
                          <option value="" disabled>Select a category</option>
                          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Ticket Price (LKR) *</label>
                        <input type="number" name="ticket_price" value={editFormData.ticket_price ?? ''} onChange={handleEditChange} required min="0" step="0.01" className="input-field w-full" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Available Tickets *</label>
                        <input type="number" name="available_tickets" value={editFormData.available_tickets ?? ''} onChange={handleEditChange} required min="0" className="input-field w-full" />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Image URL (Optional)</label>
                        <input type="url" name="image" value={editFormData.image || ''} onChange={handleEditChange} className="input-field w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/20">
                      <button type="submit" className="flex-1 glass-btn py-2.5 text-sm">Save Changes</button>
                      <button type="button" onClick={cancelEdit} className="flex-1 glass-btn text-gray-200 border-white/20 hover:border-white/40">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* Event Details Display */
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 animate-fadeIn">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        <span className="glass-badge">
                          {event.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-5 line-clamp-2">{event.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">📅</span>
                          <span>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">🎟️</span>
                          <span>LKR {event.ticket_price}</span>
                        </div>
                        <div className="flex items-center gap-2 w-max">
                          <span className="text-gray-500">🧑‍🤝‍🧑</span>
                          <span>{event.available_tickets} available</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col gap-3 md:min-w-[120px] mt-4 md:mt-0">
                      <button 
                        onClick={() => startEdit(event)}
                        className="flex-1 glass-btn text-white border-white/20 hover:border-white/40 shadow-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 glass-btn text-white border-red-500/50 hover:bg-red-500/20 shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
