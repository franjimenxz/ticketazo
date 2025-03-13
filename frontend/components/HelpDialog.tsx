import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "¿Cómo puedo agregar un nuevo ticket?",
    answer:
      "Para agregar un nuevo ticket, simplemente envía una foto del ticket a nuestro bot de WhatsApp. El sistema procesará automáticamente la información.",
  },
  {
    question: "¿Cómo puedo cambiar mi contraseña?",
    answer:
      "Puedes cambiar tu contraseña en la sección de Configuración. Haz clic en el icono de engranaje en la barra de navegación y selecciona la pestaña 'Cuenta'.",
  },
  // Más preguntas frecuentes...
]

export default function HelpDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Centro de Ayuda</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Preguntas Frecuentes</h3>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">¿Necesitas más ayuda?</h3>
          <p className="text-sm text-gray-400">
            Si no encuentras la respuesta que buscas, no dudes en contactarnos a través de nuestro chat de soporte o
            enviándonos un correo a support@ticketazo.com.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

