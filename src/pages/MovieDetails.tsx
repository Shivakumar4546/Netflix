import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails } from '../services/omdbApi'
import type { MovieDetails } from '../services/omdbApi'

const FALLBACK_POSTER = 'https://via.placeholder.com/300x450?text=No+Poster'

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        const data = await getMovieDetails(id)
        if (data) {
          setMovie(data)
          setError(null)
        } else {
          setError('Movie not found')
        }
      } catch (err) {
        setError('Failed to load movie details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
          <p className="text-gray-400 mt-4">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error || 'Movie not found'}</p>
          <button 
            onClick={() => navigate('/home')}
            className="mt-4 bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER}
              alt={movie.Title}
              className="w-full md:w-96 rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">{movie.Title}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xl mr-1">★</span>
                  <span className="text-white text-lg font-bold">{movie.imdbRating}</span>
                  <span className="text-gray-400 text-sm ml-1">/10</span>
                </div>
              )}
              <span className="text-gray-400">{movie.Year}</span>
              <span className="text-gray-400">{movie.Runtime !== 'N/A' ? movie.Runtime : 'N/A'}</span>
              <span className="text-gray-400">{movie.Rated !== 'N/A' ? movie.Rated : 'N/A'}</span>
            </div>

            {/* Genre */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.Genre.split(',').map((genre, index) => (
                <span 
                  key={index} 
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* Plot */}
            <div className="mb-6">
              <h2 className="text-white text-xl font-semibold mb-2">Plot</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.Plot !== 'N/A' ? movie.Plot : 'No plot available.'}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-gray-400 text-sm">Director</h3>
                <p className="text-white">{movie.Director !== 'N/A' ? movie.Director : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Actors</h3>
                <p className="text-white">{movie.Actors !== 'N/A' ? movie.Actors : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Language</h3>
                <p className="text-white">{movie.Language !== 'N/A' ? movie.Language : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Country</h3>
                <p className="text-white">{movie.Country !== 'N/A' ? movie.Country : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Awards</h3>
                <p className="text-white">{movie.Awards !== 'N/A' ? movie.Awards : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Writer</h3>
                <p className="text-white">{movie.Writer !== 'N/A' ? movie.Writer : 'N/A'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors">
                ▶ Play Now
              </button>
              <button className="bg-gray-600/70 hover:bg-gray-600 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors">
                + Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
