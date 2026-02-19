import { useEffect, useState } from 'react'
import MovieRow from '../components/MovieRow'
import { Movie, getPopularMovies } from '../services/omdbApi'

const FALLBACK_POSTER = 'https://via.placeholder.com/300x450?text=No+Poster'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await getPopularMovies()
        setMovies(data)
        setError(null)
      } catch (err) {
        setError('Failed to load movies. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // Get a random featured movie
  const featuredMovie = movies.length > 0 ? movies[Math.floor(Math.random() * movies.length)] : null

  // Split movies into categories
  const actionMovies = movies.filter(m => m.Title.toLowerCase().includes('avenger') || m.Title.toLowerCase().includes('spider'))
  const dramaMovies = movies.filter(m => m.Title.toLowerCase().includes('batman'))
  const popularMovies = movies

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
          <p className="text-gray-400 mt-4">Loading movies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-16">
      {/* Hero Banner */}
      {featuredMovie && (
        <div className="relative h-[70vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-netflix-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent z-10" />
          <img
            src={featuredMovie.Poster !== 'N/A' ? featuredMovie.Poster : FALLBACK_POSTER}
            alt={featuredMovie.Title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-20 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              {featuredMovie.Title}
            </h1>
            <p className="text-gray-300 text-lg mb-6 max-w-xl">
              {featuredMovie.Year} • Movie • Action & Adventure
            </p>
            <div className="flex space-x-4">
              <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors">
                ▶ Play Now
              </button>
              <button className="bg-gray-600/70 hover:bg-gray-600 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors">
                + My List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-20 relative z-30">
        {popularMovies.length > 0 && (
          <MovieRow title="Popular Movies" movies={popularMovies} />
        )}
        
        {actionMovies.length > 0 && (
          <MovieRow title="Action Movies" movies={actionMovies} />
        )}
        
        {dramaMovies.length > 0 && (
          <MovieRow title="Drama Movies" movies={dramaMovies} />
        )}
        
        {movies.length > 0 && (
          <MovieRow title="Trending Now" movies={movies} />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-netflix-dark py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Netflix Clone. This is a demo application using OMDb API.
          </p>
        </div>
      </footer>
    </div>
  )
}
