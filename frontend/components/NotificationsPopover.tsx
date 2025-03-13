"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"

const notifications = [
  { id: 1, message: "Nuevo ticket procesado", time: "Hace 5 minutos" },
  { id: 2, message: "Recordatorio: Pagar factura", time: "Hace 1 hora" },
  // Más notificaciones...
]

export default function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-700/50 rounded-full hover:text-purple-400 relative"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gray-800 border-gray-700 text-white">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold">Notificaciones</h3>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
        <div className="p-2">
          <Button variant="ghost" className="w-full text-center text-purple-400">
            Ver todas las notificaciones
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

