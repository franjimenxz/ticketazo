"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap, LogIn } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <motion.header
      className="container mx-auto px-4 py-20 md:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ticketazo
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Tu asistente de compras con IA en WhatsApp 🚀
        </motion.p>
        <motion.p
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          Olvídate de las planillas aburridas. Controla tus gastos de forma super cómoda con solo mandar una foto de tu
          ticket.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <Link href="/welcome">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-full">
              Empezar gratis <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-purple-600 text-purple-400 hover:bg-purple-600/10 text-lg px-8 py-6 rounded-full"
            >
              Ingresar <LogIn className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  )
}

