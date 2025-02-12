import { api } from './client'
import { User } from '@/contexts/auth'

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface TokenResponse {
  token: string
}

export interface VerifyResponse {
  user: User
}

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      })
      return response.data
    } catch (error) {
      throw new Error('Invalid email or password')
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data)
      return response.data
    } catch (error) {
      throw new Error('Registration failed. Please try again.')
    }
  },

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      await api.post('/auth/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    } catch (error) {
      console.error('Logout failed:', error)
      // Still remove tokens even if the request fails
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  },

  async verifyToken(token: string): Promise<VerifyResponse> {
    try {
      const response = await api.post<VerifyResponse>(
        '/auth/verify',
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      return response.data
    } catch (error) {
      throw new Error('Token verification failed')
    }
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const response = await api.post<TokenResponse>(
        '/auth/refresh',
        { refreshToken }
      )
      return response.data
    } catch (error) {
      throw new Error('Token refresh failed')
    }
  },
}
