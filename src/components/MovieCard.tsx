import { Link } from 'react-router-dom'
import { Movie } from '../services/omdbApi'

interface MovieCardProps {
  movie: Movie
}

const FALLBACK_POSTER = 'https://via.placeholder.com/300x450?text=No+Poster'

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card flex-shrink-0 w-48 group cursor-pointer">
      <div className="relative rounded-lg overflow-hidden bg-netflix-dark transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-netflix-red/30">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER}
          alt={movie.Title}
          className="w-full h-72 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm truncate">{movie.Title}</h3>
            <p className="text-gray-400 text-xs mt-1">{movie.Year}</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-white text-sm font-medium truncate group-hover:text-netflix-red transition-colors">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-xs">{movie.Year}</p>
      </div>
    </Link>
  )
}
