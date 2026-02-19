import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  signup: (email: string, password: string, confirmPassword: string) => { success: boolean; error?: string }
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_KEY = 'netflix_users'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('netflix_current_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const getUsers = (): { email: string; password: string }[] => {
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  const saveUsers = (users: { email: string; password: string }[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  const login = (email: string, password: string): boolean => {
    const users = getUsers()
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData = { email: foundUser.email }
      setUser(userData)
      localStorage.setItem('netflix_current_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const signup = (email: string, password: string, confirmPassword: string): { success: boolean; error?: string } => {
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' }
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    const users = getUsers()
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' }
    }

    const newUser = { email, password }
    saveUsers([...users, newUser])
    
    const userData = { email: newUser.email }
    setUser(userData)
    localStorage.setItem('netflix_current_user', JSON.stringify(userData))
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('netflix_current_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
