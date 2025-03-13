import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckIcon, CreditCardIcon, ZapIcon } from "lucide-react"

export default function SettingsDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Configuración</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="plan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plan">Mi Plan</TabsTrigger>
            <TabsTrigger value="pagos">Métodos de Pago</TabsTrigger>
          </TabsList>
          <TabsContent value="plan">
            <div className="space-y-6 py-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-purple-400">Plan Pro</h3>
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Activo</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Tu plan actual incluye 150 tickets mensuales vía WhatsApp, reconocimiento de texto, audio e imágenes,
                  20 transacciones recurrentes, 10 presupuestos, 2 grupos y 5 cuentas.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tickets procesados</span>
                      <span>87/150</span>
                    </div>
                    <Progress value={58} className="h-2 bg-gray-600" indicatorClassName="bg-purple-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Transacciones recurrentes</span>
                      <span>12/20</span>
                    </div>
                    <Progress value={60} className="h-2 bg-gray-600" indicatorClassName="bg-purple-500" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold">Actualiza tu plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
                  <h4 className="font-semibold mb-2">Plan Premium</h4>
                  <p className="text-sm text-gray-400 mb-2">Ideal para usuarios avanzados</p>
                  <p className="text-lg font-bold mb-2">
                    $7.999 <span className="text-sm font-normal text-gray-400">/ mes</span>
                  </p>
                  <ul className="text-sm space-y-1 mb-4">
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> 350 tickets mensuales
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> Reconocimiento de PDFs
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> Transacciones ilimitadas
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Actualizar</Button>
                </div>
                <div className="border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
                  <h4 className="font-semibold mb-2">Plan Anual</h4>
                  <p className="text-sm text-gray-400 mb-2">Ahorra con el pago anual</p>
                  <p className="text-lg font-bold mb-2">
                    $49.999 <span className="text-sm font-normal text-gray-400">/ año</span>
                  </p>
                  <ul className="text-sm space-y-1 mb-4">
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> Todo lo de Premium
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> 2 meses gratis
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> Soporte prioritario
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <ZapIcon className="mr-2 h-4 w-4" /> Mejor valor
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pagos">
            <div className="space-y-6 py-4">
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2">Método de pago actual</h3>
                <div className="flex items-center">
                  <CreditCardIcon className="h-6 w-6 mr-3 text-purple-400" />
                  <div>
                    <p className="font-medium">Tarjeta terminada en 4242</p>
                    <p className="text-sm text-gray-400">Vence: 12/25</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold">Historial de facturación</h3>
              <div className="space-y-2">
                {[
                  { date: "01/06/2023", amount: "$4.999", status: "Pagado" },
                  { date: "01/05/2023", amount: "$4.999", status: "Pagado" },
                  { date: "01/04/2023", amount: "$4.999", status: "Pagado" },
                ].map((invoice, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-gray-400">Plan Pro</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <p className="text-sm text-green-400">{invoice.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Agregar método de pago</Button>
                <Button variant="outline">Descargar facturas</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

