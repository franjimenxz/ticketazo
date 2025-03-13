"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Mandá tu ticket 📸",
    description: "Sacale una foto a tu ticket y enviásela a Ticketazo por WhatsApp. Así de simple.",
  },
  {
    number: "2",
    title: "La IA hace lo suyo 🤖",
    description: "Nuestra IA analiza todo en segundos. Es como tener un contador en tu bolsillo, pero más cool.",
  },
  {
    number: "3",
    title: "Manejá tus finanzas 💰",
    description: "Recibí un resumen detallado y empezá a dominar tus gastos como un jefe 👑",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">¿Cómo funciona esta magia? 🪄</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Es tan fácil que hasta tu abuela podría usarlo (pero es para vos, no para ella).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ number, title, description, index }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-black to-purple-900 border border-purple-800 rounded-xl p-6 shadow-lg relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
      {number !== "3" && (
        <motion.div
          className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowRight className="text-purple-400 w-8 h-8" />
        </motion.div>
      )}
    </motion.div>
  )
}

