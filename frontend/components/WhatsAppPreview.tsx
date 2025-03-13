"use client"

import { motion } from "framer-motion"
import { Receipt } from "lucide-react"
import WhatsAppChat from "@/components/WhatsAppChat"

export default function WhatsAppPreview() {
  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-black to-purple-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <motion.div
            className="relative w-[320px] h-[640px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="absolute inset-0 bg-[#ECE5DD] rounded-[40px] shadow-2xl overflow-hidden border-8 border-[#222]">
              <div className="bg-[#075E54] h-16 w-full flex items-center px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#25D366] rounded-full mr-3 flex items-center justify-center">
                    <Receipt className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Ticketazo 💰</p>
                    <p className="text-xs text-white opacity-80">Online</p>
                  </div>
                </div>
              </div>
              <WhatsAppChat />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

