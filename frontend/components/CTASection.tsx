"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import PricingPlans from "./PricingPlans"

export default function CTASection() {
  const [showPlans, setShowPlans] = useState(false)

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-transparent opacity-50"></div>
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Listo para dominar tus finanzas?</h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Unite a la revolución financiera. Es gratis, es fácil, y te va a cambiar la vida.
        </p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-full">
            Empezar gratis <Zap className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-purple-600 text-purple-400 hover:bg-purple-600/10 text-lg px-8 py-6 rounded-full"
            onClick={() => setShowPlans(true)}
          >
            Ver planes
          </Button>
        </motion.div>
      </motion.div>

      <PricingPlans open={showPlans} onOpenChange={setShowPlans} />
    </section>
  )
}

