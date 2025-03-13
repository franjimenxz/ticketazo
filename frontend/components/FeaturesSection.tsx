"use client"

import { motion } from "framer-motion"
import { Zap, Sparkles, TrendingUp, MessageSquare, ArrowRight, Receipt } from "lucide-react"

// Modificar el array de features para marcar algunas como "próximamente"
const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Escaneo Instantáneo",
    description: "Mandá una foto y listo. Nuestra IA hace todo el trabajo pesado por vos.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Categorización Mágica",
    description: "Tus gastos se organizan solos. Como ordenar tu pieza, pero sin el esfuerzo.",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Análisis Pro",
    description: "Mirá tus gastos en gráficos copados. Sentite un analista de Wall Street.",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Consultas por Voz",
    description: "Preguntale lo que quieras a Ticketazo. Es como Siri, pero para tus gastos.",
    comingSoon: true,
  },
  {
    icon: <Receipt className="h-8 w-8" />,
    title: "Historial Completo",
    description: "Todos tus tickets en un solo lugar. Nunca más 'perdí el comprobante'.",
  },
  {
    icon: <ArrowRight className="h-8 w-8" />,
    title: "Objetivos Financieros",
    description: "Poné metas y alcanzalas. Es como un juego, pero ganas plata de verdad.",
    comingSoon: true,
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Funciones que te van a volar la cabeza 🤯</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ticketazo no es solo otro bot aburrido. Es tu compañero de finanzas personales con superpoderes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Modificar la función FeatureCard para mostrar el banner de "Próximamente"
function FeatureCard({ icon, title, description, index, comingSoon }) {
  return (
    <motion.div
      className={`bg-gradient-to-br from-black to-purple-900 border border-purple-800 rounded-xl p-6 shadow-lg hover:shadow-purple-500/20 transition duration-300 relative overflow-hidden ${
        comingSoon ? "opacity-80" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: comingSoon ? 1.02 : 1.05 }}
    >
      <motion.div
        className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>

      {comingSoon && (
        <>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
            <div className="absolute top-[45%] right-[-35%] rotate-45 bg-purple-600 text-white py-1 w-[140%] text-center font-bold text-lg shadow-lg">
              PRÓXIMAMENTE
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

