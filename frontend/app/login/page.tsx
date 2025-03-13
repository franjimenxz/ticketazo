"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)

      // Verificar si el usuario ya tiene un número de WhatsApp registrado
      // Esto es una simulación - en una implementación real, verificarías esto con tu backend
      const hasWhatsApp = localStorage.getItem("whatsappConnected") === "true"

      if (hasWhatsApp) {
        router.push("/dashboard")
      } else {
        router.push("/connect-whatsapp")
      }
    } catch (error) {
      console.error("Login failed:", error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  const handleGoogleLogin = () => {
    // Implementar lógica de Google
    console.log("Iniciar sesión con Google")

    // Simulación de inicio de sesión exitoso
    // Verificar si el usuario ya tiene un número de WhatsApp registrado
    const hasWhatsApp = localStorage.getItem("whatsappConnected") === "true"

    if (hasWhatsApp) {
      router.push("/dashboard")
    } else {
      router.push("/connect-whatsapp")
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente principal */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/20 via-black to-black" />

        {/* Círculos de luz */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />

        {/* Estrellas animadas */}
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

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-800/50 rounded-xl p-8 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.15)] relative overflow-hidden">
          {/* Efecto de brillo en la tarjeta */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transform -skew-x-12 -translate-x-full animate-[shimmer_5s_infinite]" />
          <div className="text-center mb-8">
            <motion.h1
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ticketazo ✨
            </motion.h1>
            <motion.p
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Inicia sesión para administrar tus finanzas
            </motion.p>
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg rounded-lg flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Iniciar sesión con Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">o</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12 bg-black/50 border-gray-800 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-400">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-black/50 border-gray-800 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg">
                Iniciar sesión
              </Button>
            </form>

            <div className="space-y-4 text-center">
              <Link href="#" className="text-sm text-purple-400 hover:underline block">
                Recuperar contraseña
              </Link>
              <div className="text-gray-500 text-sm">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="text-purple-400 hover:underline">
                  Regístrate
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

