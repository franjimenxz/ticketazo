"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function WelcomePage() {
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
        className="relative z-10 text-center space-y-8 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Bienvenido a Ticketazo
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Tu asistente financiero impulsado por IA ✨
        </motion.p>

        <motion.div
          className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-800/50 rounded-xl p-8 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Comenzar</h2>
          <p className="text-gray-400 mb-6">Inicia sesión para empezar a gestionar tus finanzas con IA ✨</p>
          <div className="space-y-4">
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg rounded-lg flex items-center justify-center gap-2"
              onClick={() => {
                // Implementar lógica de Google
                console.log("Continuar con Google")
              }}
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Continuar con Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">o</span>
              </div>
            </div>
            <Link href="/login" className="block">
              <Button variant="outline" className="w-full h-12 text-lg">
                Iniciar sesión con email
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Al continuar, aceptas nuestros{" "}
          <Link href="#" className="text-purple-400 hover:underline">
            Términos y condiciones
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

