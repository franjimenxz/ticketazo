import { type NextRequest, NextResponse } from "next/server"

// Datos de ejemplo para simular respuestas de la API
const mockUsers = [
  {
    id: "1",
    email: "usuario@ejemplo.com",
    name: "Usuario de Prueba",
    whatsapp_connected: true,
    whatsapp_number: "5491112345678",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
]

const mockTickets = [
  {
    id: "1",
    user_id: "1",
    date: "2023-06-15",
    total: 1234.56,
    store_name: "Supermercado",
    category: "Comida",
    items: [
      { id: "1", name: "Leche", price: 200, quantity: 1 },
      { id: "2", name: "Pan", price: 150, quantity: 1 },
      { id: "3", name: "Huevos", price: 300, quantity: 1 },
    ],
    created_at: "2023-06-15T12:00:00Z",
    updated_at: "2023-06-15T12:00:00Z",
  },
  {
    id: "2",
    user_id: "1",
    date: "2023-06-14",
    total: 567.89,
    store_name: "Gasolinera",
    category: "Transporte",
    items: [{ id: "4", name: "Gasolina", price: 567.89, quantity: 1 }],
    created_at: "2023-06-14T10:00:00Z",
    updated_at: "2023-06-14T10:00:00Z",
  },
]

const mockCategories = [
  { id: "1", name: "Comida", icon: "🍽️", color: "#ff7e7e", is_default: true },
  { id: "2", name: "Transporte", icon: "🚗", color: "#4dd0e1", is_default: true },
  { id: "3", name: "Entretenimiento", icon: "🎬", color: "#ffb74d", is_default: true },
  { id: "4", name: "Salud", icon: "💊", color: "#4caf50", is_default: true },
]

const mockPlans = [
  {
    id: "1",
    name: "Free",
    description: "Empezá de a poco, organizá tus gastos con facilidad.",
    price: 0,
    currency: "ARS",
    interval: "month",
    features: [
      "¡ESTO ES GRATIS PARA TODOS! :D",
      "Gastos ilimitados en la app",
      "AI Bot - 10 gastos mensuales vía bot",
      "Reconocimiento de texto y audio",
      "3 tx recurrentes",
      "1 presupuesto",
      "1 cuenta",
    ],
    limits: {
      whatsapp_tickets: 10,
      recurring_transactions: 3,
      budgets: 1,
      groups: 0,
      accounts: 1,
    },
  },
  {
    id: "2",
    name: "Pro",
    description: "Más poder, más control, más libertad en tus finanzas.",
    price: 4999,
    currency: "ARS",
    interval: "month",
    features: [
      "Todo lo incluido en Free",
      "AI Bot - 150 gastos mensuales vía WhatsApp",
      "Reconocimiento de texto, audio e imágenes",
      "20 tx recurrentes",
      "10 presupuestos",
      "2 grupos",
      "5 cuentas",
    ],
    limits: {
      whatsapp_tickets: 150,
      recurring_transactions: 20,
      budgets: 10,
      groups: 2,
      accounts: 5,
    },
    is_popular: true,
  },
]

// Función para manejar las solicitudes a la API mock
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")

  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Manejar diferentes endpoints
  if (path === "users/me") {
    return NextResponse.json(mockUsers[0])
  }

  if (path === "tickets") {
    return NextResponse.json({
      items: mockTickets,
      total: mockTickets.length,
      page: 1,
      limit: 10,
      pages: 1,
    })
  }

  if (path.startsWith("tickets/") && path.split("/").length === 2) {
    const ticketId = path.split("/")[1]
    const ticket = mockTickets.find((t) => t.id === ticketId)

    if (ticket) {
      return NextResponse.json(ticket)
    } else {
      return NextResponse.json({ detail: "Ticket not found" }, { status: 404 })
    }
  }

  if (path === "categories") {
    return NextResponse.json(mockCategories)
  }

  if (path === "subscriptions/plans") {
    return NextResponse.json(mockPlans)
  }

  if (path === "subscriptions/current") {
    return NextResponse.json({
      id: "1",
      user_id: "1",
      plan_id: "2",
      plan: mockPlans[1],
      status: "active",
      current_period_start: "2023-06-01T00:00:00Z",
      current_period_end: "2023-07-01T00:00:00Z",
      cancel_at_period_end: false,
      created_at: "2023-06-01T00:00:00Z",
      updated_at: "2023-06-01T00:00:00Z",
      usage: {
        whatsapp_tickets: {
          used: 87,
          limit: 150,
        },
        recurring_transactions: {
          used: 12,
          limit: 20,
        },
      },
    })
  }

  if (path === "analytics/summary") {
    return NextResponse.json({
      total_income: 15231,
      total_expenses: 12543,
      balance: 2688,
      tickets_count: 143,
      period: {
        start_date: "2023-06-01",
        end_date: "2023-06-30",
      },
      comparison: {
        income_change_percentage: 2.5,
        expenses_change_percentage: -1.8,
        balance_change_percentage: 5.2,
      },
    })
  }

  if (path === "analytics/income-vs-expenses") {
    const period = new URL(request.url).searchParams.get("period") || "month"

    let data
    if (period === "week") {
      data = [
        { name: "Lun", income: 1400, expenses: 2000, date: "2023-06-19" },
        { name: "Mar", income: 1200, expenses: 1500, date: "2023-06-20" },
        { name: "Mié", income: 1100, expenses: 1800, date: "2023-06-21" },
        { name: "Jue", income: 1300, expenses: 2200, date: "2023-06-22" },
        { name: "Vie", income: 1500, expenses: 2800, date: "2023-06-23" },
        { name: "Sáb", income: 1800, expenses: 3500, date: "2023-06-24" },
        { name: "Dom", income: 1200, expenses: 2500, date: "2023-06-25" },
      ]
    } else if (period === "month") {
      data = [
        { name: "Sem 1", income: 5000, expenses: 8000, date: "2023-06-07" },
        { name: "Sem 2", income: 5500, expenses: 7500, date: "2023-06-14" },
        { name: "Sem 3", income: 6000, expenses: 9000, date: "2023-06-21" },
        { name: "Sem 4", income: 5800, expenses: 8500, date: "2023-06-28" },
      ]
    } else {
      data = [
        { name: "Ene", income: 20000, expenses: 30000, date: "2023-01-31" },
        { name: "Feb", income: 21000, expenses: 32000, date: "2023-02-28" },
        { name: "Mar", income: 22000, expenses: 31000, date: "2023-03-31" },
        { name: "Abr", income: 22000, expenses: 32000, date: "2023-04-30" },
        { name: "May", income: 24000, expenses: 35000, date: "2023-05-31" },
        { name: "Jun", income: 25000, expenses: 33000, date: "2023-06-30" },
      ]
    }

    return NextResponse.json({
      data,
      period: {
        start_date: "2023-06-01",
        end_date: "2023-06-30",
      },
    })
  }

  if (path === "analytics/expense-distribution") {
    return NextResponse.json({
      data: [
        { category: "Comida", amount: 6000, percentage: 66.7, icon: "🍽️", color: "#ff7e7e" },
        { category: "Supermercado", amount: 3000, percentage: 33.3, icon: "🛒", color: "#4dd0e1" },
      ],
      period: {
        start_date: "2023-06-01",
        end_date: "2023-06-30",
      },
    })
  }

  // Si no se encuentra el endpoint, devolver 404
  return NextResponse.json({ detail: "Not found" }, { status: 404 })
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")

  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    const body = await request.json()

    if (path === "auth/register") {
      return NextResponse.json({
        id: "2",
        email: body.email,
        name: body.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    if (path === "auth/login") {
      return NextResponse.json({
        access_token: "mock_token_12345",
        token_type: "bearer",
        expires_in: 3600,
        user: mockUsers[0],
      })
    }

    if (path === "users/me/whatsapp") {
      return NextResponse.json({
        success: true,
        message: "WhatsApp connected successfully",
        whatsapp_number: body.phone_number,
      })
    }

    if (path === "tickets") {
      const newTicket = {
        id: (mockTickets.length + 1).toString(),
        user_id: "1",
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      return NextResponse.json(newTicket)
    }

    if (path === "tickets/upload") {
      // Simular procesamiento de imagen
      return NextResponse.json({
        id: (mockTickets.length + 1).toString(),
        user_id: "1",
        date: new Date().toISOString().split("T")[0],
        total: 3140.0,
        store_name: "Restaurant",
        category: "Comida",
        items: [
          { id: "1", name: "Milanesa", price: 950.0, quantity: 1 },
          { id: "2", name: "Papas Fritas", price: 400.0, quantity: 1 },
          { id: "3", name: "Corona", price: 600.0, quantity: 1 },
          { id: "4", name: "Gaseosa", price: 500.0, quantity: 1 },
          { id: "5", name: "Limón", price: 100.0, quantity: 1 },
          { id: "6", name: "Tostado", price: 450.0, quantity: 1 },
          { id: "7", name: "Café", price: 140.0, quantity: 1 },
        ],
        image_url: "/placeholder.svg?height=400&width=300",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    if (path === "categories") {
      const newCategory = {
        id: (mockCategories.length + 1).toString(),
        ...body,
        is_default: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      return NextResponse.json(newCategory)
    }

    if (path === "subscriptions/upgrade") {
      const planId = body.plan_id
      const plan = mockPlans.find((p) => p.id === planId)

      if (!plan) {
        return NextResponse.json({ detail: "Plan not found" }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        message: "Subscription upgraded successfully",
        subscription: {
          id: "2",
          user_id: "1",
          plan_id: planId,
          plan,
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancel_at_period_end: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      })
    }

    // Si no se encuentra el endpoint, devolver 404
    return NextResponse.json({ detail: "Not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")

  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    const body = await request.json()

    if (path === "users/me") {
      return NextResponse.json({
        ...mockUsers[0],
        ...body,
        updated_at: new Date().toISOString(),
      })
    }

    if (path.startsWith("tickets/") && path.split("/").length === 2) {
      const ticketId = path.split("/")[1]
      const ticketIndex = mockTickets.findIndex((t) => t.id === ticketId)

      if (ticketIndex === -1) {
        return NextResponse.json({ detail: "Ticket not found" }, { status: 404 })
      }

      const updatedTicket = {
        ...mockTickets[ticketIndex],
        ...body,
        updated_at: new Date().toISOString(),
      }

      return NextResponse.json(updatedTicket)
    }

    // Si no se encuentra el endpoint, devolver 404
    return NextResponse.json({ detail: "Not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")

  // Simular retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (path.startsWith("tickets/") && path.split("/").length === 2) {
    const ticketId = path.split("/")[1]
    const ticketIndex = mockTickets.findIndex((t) => t.id === ticketId)

    if (ticketIndex === -1) {
      return NextResponse.json({ detail: "Ticket not found" }, { status: 404 })
    }

    return new NextResponse(null, { status: 204 })
  }

  // Si no se encuentra el endpoint, devolver 404
  return NextResponse.json({ detail: "Not found" }, { status: 404 })
}

