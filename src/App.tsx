import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/movie/:id" 
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
