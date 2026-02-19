import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Movie, searchMovies } from '../services/omdbApi'
import MovieCard from '../components/MovieCard'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setMovies([])
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        const data = await searchMovies(query)
        setMovies(data)
        setError(null)
      } catch (err) {
        setError('Failed to search movies. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
          <p className="text-gray-400 mt-4">Searching for movies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <Link
            to="/home"
            className="mt-4 inline-block bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400 mb-8">
          {movies.length} {movies.length === 1 ? 'result' : 'results'} found
        </p>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found matching your search.</p>
            <Link
              to="/home"
              className="mt-4 inline-block bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Go Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
