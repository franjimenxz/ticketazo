"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BotIcon as Robot } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ConnectWhatsAppPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de conexión exitosa
    setTimeout(() => {
      // Guardar en localStorage para simular que el usuario ya conectó WhatsApp
      localStorage.setItem("whatsappConnected", "true")
      localStorage.setItem("whatsappNumber", whatsappNumber)

      // Redirigir al dashboard
      router.push("/dashboard")

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

      {/* Estrellas animadas */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-800/50 rounded-xl p-8 backdrop-blur-sm">
          <motion.div
            className="text-center space-y-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-[#22C55E]">Conecta WhatsApp</h1>
            <p className="text-gray-400">
              Agrega tu número de WhatsApp para empezar a usar{" "}
              <span className="text-white font-semibold">
                TicketazoBot <Robot className="inline-block w-5 h-5" />
              </span>
            </p>
          </motion.div>

          <motion.form
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-gray-400 block">
                Número de WhatsApp
              </Label>
              <p className="text-sm text-gray-500">Ingresa tu número con código de país (ej: 549111234567)</p>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="549111234567"
                className="h-12 bg-black/50 border-[#22C55E] text-white focus:ring-[#22C55E] focus:border-[#22C55E]"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-[#22C55E] hover:bg-[#16A34A] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Conectando...
                </div>
              ) : (
                "Continuar"
              )}
            </Button>
          </motion.form>
        </div>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">Al continuar, aceptas recibir mensajes de WhatsApp de Ticketazo</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

