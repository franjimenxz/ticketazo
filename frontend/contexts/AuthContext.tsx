"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import api from "@/lib/api-client"

type User = {
  id: string
  email: string
  name: string
  whatsapp_connected?: boolean
  whatsapp_number?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar la aplicación
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        // Verificar si hay un token en localStorage
        const token = localStorage.getItem('token')
        if (token) {
          // Verificar si el token es válido
          const userData = await api.auth.verifyToken()
          setUser(userData)
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        // Si hay un error, limpiar el token
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Llamar a la API de login
      const response = await api.auth.login({ email, password })
      
      // Guardar el usuario
      setUser(response.user)
      
      // El token ya se guarda en localStorage dentro de la función login de api-client
      return response.user
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Llamar a la función de logout de la API
    api.auth.logout()
    
    // Limpiar el estado
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

