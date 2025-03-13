"use client"

import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import WhatsAppPreview from "@/components/WhatsAppPreview"
import FeaturesSection from "@/components/FeaturesSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import CTASection from "@/components/CTASection"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <WhatsAppPreview />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </motion.div>
  )
}

