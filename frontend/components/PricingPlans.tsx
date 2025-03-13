"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Empezá de a poco, organizá tus gastos con facilidad.",
    price: "Gratis",
    priceDetail: "para siempre 😊",
    features: [
      "¡ESTO ES GRATIS PARA TODOS! :D",
      "Gastos ilimitados en la app",
      "AI Bot - 10 gastos mensuales vía bot",
      "Reconocimiento de texto y audio",
      "3 tx recurrentes",
      "1 presupuesto",
      "1 cuenta",
    ],
    buttonText: "Registrarme",
    buttonVariant: "default",
  },
  {
    name: "Pro",
    description: "Más poder, más control, más libertad en tus finanzas.",
    price: "$ 4.999",
    priceDetail: "US$ 4.99 por mes con Mercado Pago",
    features: [
      "Todo lo incluido en Free",
      "AI Bot - 150 gastos mensuales vía WhatsApp",
      "Reconocimiento de texto, audio e imágenes",
      "20 tx recurrentes",
      "10 presupuestos",
      "2 grupos",
      "5 cuentas",
    ],
    buttonText: "Suscribirme en pesos AR",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Premium",
    description: "La experiencia completa para quienes quieren llevar sus finanzas al siguiente nivel.",
    price: "$ 7.999",
    priceDetail: "US$ 7.99 por mes con Mercado Pago",
    features: [
      "Todo lo incluido en Pro",
      "AI Bot - 350 gastos mensuales vía WhatsApp",
      "Reconocimiento de texto, audio, imágenes y PDFs",
      "Tx recurrentes ilimitadas",
      "Presupuestos ilimitados",
      "Grupos ilimitados",
      "Cuentas ilimitadas",
    ],
    buttonText: "Suscribirme en pesos AR",
    buttonVariant: "premium",
  },
]

interface PricingPlansProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PricingPlans({ open, onOpenChange }: PricingPlansProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl bg-black border-purple-800">
        <DialogHeader>
          <DialogTitle className="text-3xl md:text-5xl font-bold text-center mb-4">Planes de Ticketazo 💰</DialogTitle>
          <DialogDescription className="text-xl text-center">
            Elegí el plan que mejor se adapte a tus necesidades
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col bg-gradient-to-br from-black to-purple-900 border border-purple-800 rounded-xl p-6 shadow-lg ${
                plan.popular ? "ring-2 ring-purple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Popular</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="mb-6">
                <div className="text-3xl font-bold text-white">{plan.price}</div>
                <div className="text-sm text-gray-400">{plan.priceDetail}</div>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-auto ${
                  plan.buttonVariant === "premium"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : ""
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

