"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon, DownloadIcon } from "lucide-react"

// Datos de ejemplo
const movimientos = [
  {
    id: 1,
    fecha: "2023-06-15",
    categoria: "Supermercado",
    monto: 1234.56,
    productos: [
      { nombre: "Leche", precio: 200 },
      { nombre: "Pan", precio: 150 },
      { nombre: "Huevos", precio: 300 },
    ],
  },
  {
    id: 2,
    fecha: "2023-06-14",
    categoria: "Transporte",
    monto: 567.89,
    productos: [{ nombre: "Gasolina", precio: 567.89 }],
  },
  // ... más movimientos
]

export default function MovimientosPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white mb-8">Movimientos</h1>
        <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
          <DownloadIcon className="mr-2 h-4 w-4" /> Descargar Datos
        </Button>
      </div>

      {movimientos.map((movimiento) => (
        <MovimientoCard key={movimiento.id} movimiento={movimiento} />
      ))}
    </motion.div>
  )
}

function MovimientoCard({ movimiento }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="p-6 bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-white">{movimiento.categoria}</p>
          <p className="text-sm text-gray-400">{movimiento.fecha}</p>
        </div>
        <div className="flex items-center">
          <p className="text-xl font-bold text-white mr-4">${movimiento.monto.toFixed(2)}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 border-t border-gray-700 pt-4"
        >
          <h3 className="text-white font-semibold mb-2">Productos:</h3>
          <ul className="space-y-2">
            {movimiento.productos.map((producto, index) => (
              <li key={index} className="flex justify-between text-gray-300">
                <span>{producto.nombre}</span>
                <span>${producto.precio.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </Card>
  )
}

function handleDownload() {
  // Aquí iría la lógica para descargar los datos
  // Por ahora, solo mostraremos un mensaje en la consola
  console.log("Descargando datos...")
}

