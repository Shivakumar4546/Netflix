import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    const result = signup(email, password, confirmPassword)
    if (result.success) {
      navigate('/home')
    } else {
      setError(result.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-netflix-red text-5xl font-bold tracking-wider">NETFLIX</span>
        </div>

        {/* Signup Form */}
        <div className="bg-netflix-dark rounded-lg p-8 shadow-xl">
          <h1 className="text-white text-3xl font-bold mb-6">Sign Up</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-400 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red transition-colors"
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-400 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red transition-colors"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-netflix-red hover:bg-red-700 text-white font-bold py-3 rounded-md transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-netflix-red hover:underline">
                Sign in now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
