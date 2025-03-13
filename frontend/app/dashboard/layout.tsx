import type React from "react"
import { Navbar } from "@/components/dashboard/Navbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 m-6 bg-white/80 dark:bg-gray-800/30 rounded-3xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 overflow-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}

