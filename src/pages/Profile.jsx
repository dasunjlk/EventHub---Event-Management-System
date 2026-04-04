import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'

const Profile = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await authAPI.getProfile()
        const profileData = response.data
        setUser(profileData)
        setFormData((prev) => ({
          ...prev,
          name: profileData.name || '',
          email: profileData.email || '',
          currentPassword: '',
          newPassword: '',
        }))
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch profile'
        setError(message)

        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      }

      if (formData.newPassword.trim()) {
        payload.currentPassword = formData.currentPassword
        payload.newPassword = formData.newPassword
      }

      const response = await authAPI.updateProfile(payload)
      const updatedUser = response.data

      setUser(updatedUser)
      setSuccess(updatedUser.message || 'Profile updated successfully')
      setFormData((prev) => ({
        ...prev,
        name: updatedUser.name || prev.name,
        email: updatedUser.email || prev.email,
        currentPassword: '',
        newPassword: '',
      }))

      if (updatedUser.token) {
        localStorage.setItem('token', updatedUser.token)
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: updatedUser.id || user?._id || user?.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role || user?.role,
        })
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="text-white text-xl animate-pulse">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl border-white/20">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black text-white drop-shadow-md">{user?.name}</h1>
            <p className="text-gray-400 mt-1 font-medium italic">{(user?.role || 'user').toUpperCase()}</p>
            <p className="text-gray-400 mt-1 font-medium">{user?.email}</p>
            <p className="text-gray-200 mt-4 leading-relaxed max-w-xl">
              Keep your account information up to date for a smoother booking and event management experience.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <button
                onClick={handleLogout}
                className="glass-btn text-sm py-2 px-6 border-red-500/30 text-red-200 bg-red-500/10 hover:bg-red-500/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="glass-panel p-4 text-sm text-red-200 bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            {error}
          </div>
        )}

        {success && (
          <div className="glass-panel p-4 text-sm text-green-200 bg-green-500/10 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            {success}
          </div>
        )}

        <div className="glass-panel p-8 shadow-2xl border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>

            <div className="pt-3 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3">Change password (optional)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="Required if changing password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="At least 8 chars with letters and numbers"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full glass-btn py-3 text-base font-bold"
            >
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="glass-panel p-8 shadow-2xl border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard" className="glass-btn text-sm text-center">Go to Dashboard</Link>
            <Link to="/my-bookings" className="glass-btn text-sm text-center">View My Bookings</Link>
            {(user?.role === 'organizer' || user?.role === 'admin') && (
              <Link to="/manage-events" className="glass-btn text-sm text-center">Manage My Events</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
