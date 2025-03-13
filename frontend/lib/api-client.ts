const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Función auxiliar para realizar peticiones HTTP
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Configuración por defecto para todas las peticiones
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }

  // Añadir token de autenticación si existe
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  // Combinar opciones por defecto con las proporcionadas
  const fetchOptions = {
    ...defaultOptions,
    ...options,
  }

  try {
    const response = await fetch(url, fetchOptions)

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      // Intentar obtener el mensaje de error del servidor
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.detail || `Error ${response.status}: ${response.statusText}`)
    }

    // Si la respuesta está vacía, devolver null
    if (response.status === 204) {
      return null
    }

    // Devolver los datos como JSON
    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// API de Autenticación
export const authAPI = {
  // Registrar un nuevo usuario
  register: async (userData: {
    email: string
    password: string
    name: string
  }) => {
    return fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  // Iniciar sesión
  login: async (credentials: {
    email: string
    password: string
  }) => {
    const data = await fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    // Guardar el token en localStorage
    if (data.access_token) {
      localStorage.setItem("token", data.access_token)
    }

    return data
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("whatsappConnected")
    localStorage.removeItem("whatsappNumber")
  },

  // Verificar si el usuario está autenticado
  verifyToken: async () => {
    return fetchAPI("/auth/verify")
  },

  // Recuperar contraseña
  requestPasswordReset: async (email: string) => {
    return fetchAPI("/auth/password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },

  // Establecer nueva contraseña
  resetPassword: async (data: {
    token: string
    password: string
  }) => {
    return fetchAPI("/auth/password-reset/confirm", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// API de Usuarios
export const userAPI = {
  // Obtener perfil del usuario actual
  getProfile: async () => {
    return fetchAPI("/users/me")
  },

  // Actualizar perfil del usuario
  updateProfile: async (profileData: {
    name?: string
    email?: string
    phone?: string
    avatar?: string
  }) => {
    return fetchAPI("/users/me", {
      method: "PATCH",
      body: JSON.stringify(profileData),
    })
  },

  // Cambiar contraseña
  changePassword: async (passwordData: {
    current_password: string
    new_password: string
  }) => {
    return fetchAPI("/users/me/password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    })
  },

  // Conectar número de WhatsApp
  connectWhatsApp: async (whatsappNumber: string) => {
    return fetchAPI("/users/me/whatsapp", {
      method: "POST",
      body: JSON.stringify({ phone_number: whatsappNumber }),
    })
  },

  // Actualizar preferencias de notificaciones
  updateNotificationPreferences: async (preferences: {
    email_notifications: boolean
    push_notifications: boolean
    weekly_summary: boolean
  }) => {
    return fetchAPI("/users/me/notifications", {
      method: "PUT",
      body: JSON.stringify(preferences),
    })
  },
}

// API de Tickets (recibos)
export const ticketAPI = {
  // Obtener todos los tickets del usuario
  getTickets: async (params?: {
    page?: number
    limit?: number
    start_date?: string
    end_date?: string
    category?: string
  }) => {
    const queryParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return fetchAPI(`/tickets${query}`)
  },

  // Obtener un ticket específico
  getTicket: async (ticketId: string) => {
    return fetchAPI(`/tickets/${ticketId}`)
  },

  // Crear un nuevo ticket manualmente
  createTicket: async (ticketData: {
    date: string
    total: number
    store_name: string
    category: string
    items: Array<{
      name: string
      price: number
      quantity: number
    }>
  }) => {
    return fetchAPI("/tickets", {
      method: "POST",
      body: JSON.stringify(ticketData),
    })
  },

  // Subir una imagen de ticket para procesamiento
  uploadTicketImage: async (formData: FormData) => {
    return fetchAPI("/tickets/upload", {
      method: "POST",
      body: formData,
      headers: {}, // Eliminar Content-Type para que el navegador establezca el boundary correcto
    })
  },

  // Actualizar un ticket
  updateTicket: async (ticketId: string, ticketData: any) => {
    return fetchAPI(`/tickets/${ticketId}`, {
      method: "PATCH",
      body: JSON.stringify(ticketData),
    })
  },

  // Eliminar un ticket
  deleteTicket: async (ticketId: string) => {
    return fetchAPI(`/tickets/${ticketId}`, {
      method: "DELETE",
    })
  },
}

// API de Análisis
export const analyticsAPI = {
  // Obtener resumen de gastos
  getSummary: async (params: {
    period: "week" | "month" | "quarter" | "year" | "custom"
    start_date?: string
    end_date?: string
  }) => {
    const queryParams = new URLSearchParams()
    queryParams.append("period", params.period)

    if (params.start_date) {
      queryParams.append("start_date", params.start_date)
    }

    if (params.end_date) {
      queryParams.append("end_date", params.end_date)
    }

    return fetchAPI(`/analytics/summary?${queryParams.toString()}`)
  },

  // Obtener datos para el gráfico de ingresos vs gastos
  getIncomeVsExpenses: async (params: {
    period: "week" | "month" | "quarter" | "year" | "custom"
    start_date?: string
    end_date?: string
  }) => {
    const queryParams = new URLSearchParams()
    queryParams.append("period", params.period)

    if (params.start_date) {
      queryParams.append("start_date", params.start_date)
    }

    if (params.end_date) {
      queryParams.append("end_date", params.end_date)
    }

    return fetchAPI(`/analytics/income-vs-expenses?${queryParams.toString()}`)
  },

  // Obtener distribución de gastos por categoría
  getExpenseDistribution: async (params: {
    period: "week" | "month" | "quarter" | "year" | "custom"
    start_date?: string
    end_date?: string
  }) => {
    const queryParams = new URLSearchParams()
    queryParams.append("period", params.period)

    if (params.start_date) {
      queryParams.append("start_date", params.start_date)
    }

    if (params.end_date) {
      queryParams.append("end_date", params.end_date)
    }

    return fetchAPI(`/analytics/expense-distribution?${queryParams.toString()}`)
  },

  // Obtener tendencias de gastos
  getExpenseTrends: async (params: {
    period: "week" | "month" | "quarter" | "year" | "custom"
    start_date?: string
    end_date?: string
  }) => {
    const queryParams = new URLSearchParams()
    queryParams.append("period", params.period)

    if (params.start_date) {
      queryParams.append("start_date", params.start_date)
    }

    if (params.end_date) {
      queryParams.append("end_date", params.end_date)
    }

    return fetchAPI(`/analytics/expense-trends?${queryParams.toString()}`)
  },
}

// API de Categorías
export const categoryAPI = {
  // Obtener todas las categorías
  getCategories: async () => {
    return fetchAPI("/categories")
  },

  // Crear una nueva categoría personalizada
  createCategory: async (categoryData: {
    name: string
    icon?: string
    color?: string
  }) => {
    return fetchAPI("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  },

  // Actualizar una categoría
  updateCategory: async (
    categoryId: string,
    categoryData: {
      name?: string
      icon?: string
      color?: string
    },
  ) => {
    return fetchAPI(`/categories/${categoryId}`, {
      method: "PATCH",
      body: JSON.stringify(categoryData),
    })
  },

  // Eliminar una categoría
  deleteCategory: async (categoryId: string) => {
    return fetchAPI(`/categories/${categoryId}`, {
      method: "DELETE",
    })
  },
}

// API de Suscripciones
export const subscriptionAPI = {
  // Obtener información del plan actual
  getCurrentPlan: async () => {
    return fetchAPI("/subscriptions/current")
  },

  // Obtener todos los planes disponibles
  getAvailablePlans: async () => {
    return fetchAPI("/subscriptions/plans")
  },

  // Actualizar a un plan de pago
  upgradePlan: async (planId: string) => {
    return fetchAPI("/subscriptions/upgrade", {
      method: "POST",
      body: JSON.stringify({ plan_id: planId }),
    })
  },

  // Cancelar suscripción
  cancelSubscription: async () => {
    return fetchAPI("/subscriptions/cancel", {
      method: "POST",
    })
  },

  // Obtener historial de facturación
  getBillingHistory: async () => {
    return fetchAPI("/subscriptions/billing-history")
  },
}

// Exportar todas las APIs
export default {
  auth: authAPI,
  user: userAPI,
  ticket: ticketAPI,
  analytics: analyticsAPI,
  category: categoryAPI,
  subscription: subscriptionAPI,
}

