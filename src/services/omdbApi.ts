import axios from 'axios'

const API_KEY = '636e857d'
const BASE_URL = 'https://www.omdbapi.com/'

const api = axios.create({
  baseURL: BASE_URL,
})

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  imdbRating: string
  imdbID: string
  Type: string
  Response: string
}

export interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await api.get<SearchResponse>('', {
      params: {
        s: query,
        apikey: API_KEY,
      },
    })
    
    if (response.data.Response === 'True') {
      return response.data.Search
    }
    return []
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails | null> => {
  try {
    const response = await api.get<MovieDetails>('', {
      params: {
        i: imdbID,
        apikey: API_KEY,
      },
    })
    
    if (response.data.Response === 'True') {
      return response.data
    }
    return null
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  const queries = ['Avengers', 'Batman', 'Spider']
  const allMovies: Movie[] = []
  
  try {
    const responses = await Promise.all(
      queries.map(query => api.get<SearchResponse>('', {
        params: { s: query, apikey: API_KEY }
      }))
    )
    
    responses.forEach(response => {
      if (response.data.Response === 'True' && response.data.Search) {
        allMovies.push(...response.data.Search)
      }
    })
    
    // Remove duplicates based on imdbID
    const uniqueMovies = allMovies.filter((movie, index, self) => 
      index === self.findIndex((m) => m.imdbID === movie.imdbID)
    )
    
    return uniqueMovies
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}
