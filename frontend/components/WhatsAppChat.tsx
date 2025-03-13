"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Receipt } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const messages = [
  {
    type: "bot",
    content: "¡Hola! Mándame una foto de tu ticket y te lo analizo al toque 🚀",
  },
  {
    type: "user",
    content: "Acá va mi ticket 📸",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ticket-compra-junun-cerveza-limon-redes-socialesjpg.jpg-SOdrv4RgpeiU73cSc9upgkhxULQbz0.jpeg",
  },
  {
    type: "bot",
    content: (
      <>
        ¡Listo! Acá va el resumen de tu compra:
        <ul className="text-xs text-gray-600 mt-1">
          <li>💰 Total: $3140,00</li>
          <li>🍽️ Items: 7 productos</li>
          <li>🏪 Lugar: Restaurant</li>
          <li>📝 Detalle:</li>
          <li className="ml-2">• Milanesa: $950,00</li>
          <li className="ml-2">• Papas Fritas: $400,00</li>
          <li className="ml-2">• Corona: $600,00</li>
          <li className="ml-2">• Gaseosa: $500,00</li>
          <li className="ml-2">• Limón: $100,00</li>
          <li className="ml-2">• Tostado: $450,00</li>
          <li className="ml-2">• Café: $140,00</li>
        </ul>
        <span className="text-xs text-gray-600 mt-1 block">¿Querés ver más detalles en la web? 👀</span>
      </>
    ),
  },
]

export default function WhatsAppChat() {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const showNextMessage = () => {
      if (visibleMessages < messages.length) {
        if (visibleMessages === 1) {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setVisibleMessages((prev) => prev + 1)
          }, 2000)
        } else {
          setVisibleMessages((prev) => prev + 1)
        }
      }
    }

    const timer = setTimeout(showNextMessage, visibleMessages === 0 ? 1000 : 2000)
    return () => clearTimeout(timer)
  }, [visibleMessages])

  return (
    <div className="bg-[#ECE5DD] h-[calc(100%-4rem)] w-full p-4 overflow-y-auto">
      <AnimatePresence>
        {messages.slice(0, visibleMessages).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${message.type === "user" ? "flex justify-end" : ""} mb-3`}
          >
            <div
              className={`${
                message.type === "user"
                  ? "bg-[#DCF8C6] rounded-lg p-3 max-w-[80%]"
                  : "bg-white rounded-lg shadow-sm p-3 max-w-[80%]"
              }`}
            >
              {message.type === "bot" && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <Receipt className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#075E54]">Ticketazo 💰</p>
                    <div className="text-xs text-gray-600">{message.content}</div>
                  </div>
                </div>
              )}
              {message.type === "user" && (
                <>
                  {message.image && (
                    <Image
                      src={message.image || "/placeholder.svg"}
                      alt="Ticket de compra"
                      width={280}
                      height={400}
                      className="rounded mb-1"
                    />
                  )}
                  <p className="text-xs text-gray-600">{message.content}</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-lg shadow-sm p-3 mb-3 max-w-[80%]"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <div className="flex gap-2 items-center">
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, ease: "easeInOut" }}
              />
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, ease: "easeInOut", delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

