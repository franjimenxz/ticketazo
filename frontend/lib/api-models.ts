export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirmRequest {
  token: string
  password: string
}

// Modelos de Usuario
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar_url?: string
  whatsapp_connected: boolean
  whatsapp_number?: string
  created_at: string
  updated_at: string
}

export interface UpdateProfileRequest {
  name?: string
  email?: string
  phone?: string
  avatar?: string
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

export interface WhatsAppConnectionRequest {
  phone_number: string
}

export interface NotificationPreferences {
  email_notifications: boolean
  push_notifications: boolean
  weekly_summary: boolean
}

// Modelos de Tickets
export interface TicketItem {
  id?: string
  name: string
  price: number
  quantity: number
  category?: string
}

export interface Ticket {
  id: string
  user_id: string
  date: string
  total: number
  store_name: string
  category: string
  items: TicketItem[]
  image_url?: string
  created_at: string
  updated_at: string
}

export interface CreateTicketRequest {
  date: string
  total: number
  store_name: string
  category: string
  items: Omit<TicketItem, "id">[]
}

export interface UpdateTicketRequest {
  date?: string
  total?: number
  store_name?: string
  category?: string
  items?: Omit<TicketItem, "id">[]
}

export interface TicketListResponse {
  items: Ticket[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface TicketQueryParams {
  page?: number
  limit?: number
  start_date?: string
  end_date?: string
  category?: string
}

// Modelos de Análisis
export interface PeriodParams {
  period: "week" | "month" | "quarter" | "year" | "custom"
  start_date?: string
  end_date?: string
}

export interface SummaryResponse {
  total_income: number
  total_expenses: number
  balance: number
  tickets_count: number
  period: {
    start_date: string
    end_date: string
  }
  comparison: {
    income_change_percentage: number
    expenses_change_percentage: number
    balance_change_percentage: number
  }
}

export interface IncomeVsExpensesDataPoint {
  name: string
  income: number
  expenses: number
  date: string
}

export interface IncomeVsExpensesResponse {
  data: IncomeVsExpensesDataPoint[]
  period: {
    start_date: string
    end_date: string
  }
}

export interface ExpenseDistributionItem {
  category: string
  amount: number
  percentage: number
  icon?: string
  color?: string
}

export interface ExpenseDistributionResponse {
  data: ExpenseDistributionItem[]
  period: {
    start_date: string
    end_date: string
  }
}

export interface ExpenseTrendsResponse {
  data: {
    date: string
    amount: number
    trend: "up" | "down" | "stable"
  }[]
  period: {
    start_date: string
    end_date: string
  }
}

// Modelos de Categorías
export interface Category {
  id: string
  name: string
  icon?: string
  color?: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface CreateCategoryRequest {
  name: string
  icon?: string
  color?: string
}

export interface UpdateCategoryRequest {
  name?: string
  icon?: string
  color?: string
}

// Modelos de Suscripciones
export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: "month" | "year"
  features: string[]
  limits: {
    whatsapp_tickets: number
    recurring_transactions: number
    budgets: number
    groups: number
    accounts: number
  }
  is_popular?: boolean
}

export interface CurrentSubscription {
  id: string
  user_id: string
  plan_id: string
  plan: SubscriptionPlan
  status: "active" | "canceled" | "expired"
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
  usage: {
    whatsapp_tickets: {
      used: number
      limit: number
    }
    recurring_transactions: {
      used: number
      limit: number
    }
  }
}

export interface BillingHistoryItem {
  id: string
  user_id: string
  amount: number
  currency: string
  status: "paid" | "pending" | "failed"
  payment_method: string
  description: string
  invoice_url?: string
  created_at: string
}

export interface UpgradePlanRequest {
  plan_id: string
}

