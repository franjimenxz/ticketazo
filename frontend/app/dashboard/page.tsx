"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { PieChart, Pie, Cell } from "recharts"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, ReceiptIcon, CalendarIcon } from "lucide-react"

// Datos de ejemplo para diferentes períodos
const dataByPeriod = {
  week: [
    { name: "Lun", gastos: 2000, ingresos: 1400 },
    { name: "Mar", gastos: 1500, ingresos: 1200 },
    { name: "Mié", gastos: 1800, ingresos: 1100 },
    { name: "Jue", gastos: 2200, ingresos: 1300 },
    { name: "Vie", gastos: 2800, ingresos: 1500 },
    { name: "Sáb", gastos: 3500, ingresos: 1800 },
    { name: "Dom", gastos: 2500, ingresos: 1200 },
  ],
  month: [
    { name: "Sem 1", gastos: 8000, ingresos: 5000 },
    { name: "Sem 2", gastos: 7500, ingresos: 5500 },
    { name: "Sem 3", gastos: 9000, ingresos: 6000 },
    { name: "Sem 4", gastos: 8500, ingresos: 5800 },
  ],
  threeMonths: [
    { name: "Abr", gastos: 32000, ingresos: 22000 },
    { name: "May", gastos: 35000, ingresos: 24000 },
    { name: "Jun", gastos: 33000, ingresos: 25000 },
  ],
  sixMonths: [
    { name: "Ene", gastos: 30000, ingresos: 20000 },
    { name: "Feb", gastos: 32000, ingresos: 21000 },
    { name: "Mar", gastos: 31000, ingresos: 22000 },
    { name: "Abr", gastos: 32000, ingresos: 22000 },
    { name: "May", gastos: 35000, ingresos: 24000 },
    { name: "Jun", gastos: 33000, ingresos: 25000 },
  ],
  custom: [
    // Se llenará dinámicamente
  ],
}

const pieData = [
  { name: "Comida", value: 66.7, icon: "🍽️" },
  { name: "Supermercado", value: 33.3, icon: "🛒" },
]

const COLORS = ["#ff7e7e", "#4dd0e1"]

// Función para generar datos aleatorios para un rango de fechas personalizado
const generateCustomData = (from, to) => {
  const data = []
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))

  // Si son más de 30 días, agrupamos por semanas
  if (days > 30) {
    const weeks = Math.ceil(days / 7)
    for (let i = 0; i < weeks; i++) {
      data.push({
        name: `Sem ${i + 1}`,
        gastos: Math.floor(Math.random() * 10000) + 5000,
        ingresos: Math.floor(Math.random() * 8000) + 3000,
      })
    }
  } else {
    // Si son menos de 30 días, mostramos por día
    for (let i = 0; i < days; i++) {
      const date = addDays(from, i)
      data.push({
        name: format(date, "dd/MM"),
        gastos: Math.floor(Math.random() * 1000) + 500,
        ingresos: Math.floor(Math.random() * 800) + 300,
      })
    }
  }

  return data
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [chartData, setChartData] = useState(dataByPeriod.month)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Efecto para actualizar los datos del gráfico cuando cambia el período seleccionado
  useEffect(() => {
    if (selectedPeriod === "custom" && dateRange.from && dateRange.to) {
      const customData = generateCustomData(dateRange.from, dateRange.to)
      setChartData(customData)
    } else {
      setChartData(dataByPeriod[selectedPeriod])
    }
  }, [selectedPeriod, dateRange])

  // Función para manejar la selección de período predefinido
  const handlePeriodChange = (value) => {
    setSelectedPeriod(value)
    setDateRange({ from: null, to: null })
    setIsCalendarOpen(false)
  }

  // Función para manejar la selección de rango personalizado
  const handleDateRangeChange = (range) => {
    if (range.from && range.to) {
      setSelectedPeriod("custom")
      setDateRange(range)

      // Generar datos personalizados para el rango seleccionado
      const customData = generateCustomData(range.from, range.to)
      dataByPeriod.custom = customData
      setChartData(customData)

      // Cerrar el calendario después de seleccionar un rango completo
      if (range.from && range.to) {
        setTimeout(() => setIsCalendarOpen(false), 500)
      }
    } else {
      setDateRange(range)
    }
  }

  // Función para abrir el calendario
  const handleOpenCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos Totales"
          value="$15,231"
          icon={<ArrowUpIcon className="w-6 h-6 text-green-400" />}
          trend="+2.5%"
        />
        <StatCard
          title="Gastos Totales"
          value="$12,543"
          icon={<ArrowDownIcon className="w-6 h-6 text-red-400" />}
          trend="-1.8%"
        />
        <StatCard
          title="Balance"
          value="$2,688"
          icon={<TrendingUpIcon className="w-6 h-6 text-blue-400" />}
          trend="+5.2%"
        />
        <StatCard
          title="Tickets Procesados"
          value="143"
          icon={<ReceiptIcon className="w-6 h-6 text-purple-400" />}
          trend="+12"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Ingresos vs Gastos"
          filters={
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[150px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                  <SelectItem value="threeMonths">Últimos 3 meses</SelectItem>
                  <SelectItem value="sixMonths">Últimos 6 meses</SelectItem>
                </SelectContent>
              </Select>

              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={handleOpenCalendar}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from && dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yy")} - {format(dateRange.to, "dd/MM/yy")}
                      </>
                    ) : (
                      "Rango personalizado"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                    locale={es}
                    className="bg-white dark:bg-gray-800"
                  />
                </PopoverContent>
              </Popover>
            </div>
          }
        >
          <div className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 100, 100, 0.3)" />
                <XAxis dataKey="name" stroke="rgba(100, 100, 100, 0.8)" tick={{ fill: "var(--foreground)" }} />
                <YAxis
                  stroke="rgba(100, 100, 100, 0.8)"
                  tick={{ fill: "var(--foreground)" }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--foreground)", fontWeight: "bold", marginBottom: "5px" }}
                  itemStyle={{ padding: "2px 0" }}
                  formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  name="Ingresos"
                  stroke="#4ade80"
                  fillOpacity={1}
                  fill="url(#colorIngresos)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  name="Gastos"
                  stroke="#f87171"
                  fillOpacity={1}
                  fill="url(#colorGastos)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Distribución de gastos (ARS)" subtitle="Análisis de gastos por categoría">
          <div className="h-[400px] flex flex-col">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-3">Top 5 Categorías</h3>
              <div className="space-y-2">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[index] }} />
                      <span className="text-sm">
                        {entry.icon} {entry.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Últimos Tickets">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700">
                <th className="p-3">Fecha</th>
                <th className="p-3">Descripción</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3 text-right">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "2023-06-15", description: "Supermercado", amount: "$1,234.56", category: "Comida" },
                { date: "2023-06-14", description: "Gasolina", amount: "$567.89", category: "Transporte" },
                { date: "2023-06-13", description: "Cine", amount: "$234.56", category: "Entretenimiento" },
                { date: "2023-06-12", description: "Farmacia", amount: "$78.90", category: "Salud" },
              ].map((ticket, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-3">{ticket.date}</td>
                  <td className="p-3">{ticket.description}</td>
                  <td className="p-3 text-right">{ticket.amount}</td>
                  <td className="p-3 text-right">{ticket.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </motion.div>
  )
}

function StatCard({ title, value, icon, trend }) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        {icon}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        <span className={trend.startsWith("+") ? "text-green-400" : "text-red-400"}>{trend}</span> vs mes anterior
      </p>
    </Card>
  )
}

function ChartCard({ title, subtitle, children, filters }) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {filters}
      </div>
      {children}
    </Card>
  )
}

