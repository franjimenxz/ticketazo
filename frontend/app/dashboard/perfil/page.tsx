"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { UserIcon, ShieldIcon, BellIcon, CameraIcon } from "lucide-react"

export default function PerfilPage() {
  const { user } = useAuth()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-800 border-gray-700 col-span-1 flex flex-col items-center">
          <div className="relative mb-4 group">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatarUrl} alt={user?.name} />
              <AvatarFallback className="text-2xl">{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <CameraIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white">{user?.name || "Usuario"}</h2>
          <p className="text-gray-400 mb-4">{user?.email || "usuario@ejemplo.com"}</p>
          <p className="text-sm text-purple-400 font-semibold mb-6">Plan Pro</p>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Editar Perfil</Button>
        </Card>

        <Card className="p-6 bg-gray-800 border-gray-700 col-span-1 md:col-span-2">
          <Tabs defaultValue="informacion">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="informacion" className="data-[state=active]:bg-purple-600">
                <UserIcon className="mr-2 h-4 w-4" /> Información
              </TabsTrigger>
              <TabsTrigger value="seguridad" className="data-[state=active]:bg-purple-600">
                <ShieldIcon className="mr-2 h-4 w-4" /> Seguridad
              </TabsTrigger>
              <TabsTrigger value="notificaciones" className="data-[state=active]:bg-purple-600">
                <BellIcon className="mr-2 h-4 w-4" /> Notificaciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="informacion" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" defaultValue={user?.name || "Usuario"} className="bg-gray-700 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" defaultValue="Apellido" className="bg-gray-700 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={user?.email || "usuario@ejemplo.com"}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue="+54 9 11 1234-5678" className="bg-gray-700 border-gray-600" />
                </div>
              </div>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Guardar Cambios</Button>
            </TabsContent>

            <TabsContent value="seguridad" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-actual">Contraseña Actual</Label>
                  <Input id="password-actual" type="password" className="bg-gray-700 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-nueva">Nueva Contraseña</Label>
                  <Input id="password-nueva" type="password" className="bg-gray-700 border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirmar">Confirmar Contraseña</Label>
                  <Input id="password-confirmar" type="password" className="bg-gray-700 border-gray-600" />
                </div>
              </div>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Actualizar Contraseña</Button>
            </TabsContent>

            <TabsContent value="notificaciones" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Notificaciones por Email</h3>
                    <p className="text-sm text-gray-400">Recibe actualizaciones sobre tus tickets</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="email-notif" className="mr-2 accent-purple-600" defaultChecked />
                    <Label htmlFor="email-notif">Activado</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Notificaciones Push</h3>
                    <p className="text-sm text-gray-400">Recibe alertas en tiempo real</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="push-notif" className="mr-2 accent-purple-600" defaultChecked />
                    <Label htmlFor="push-notif">Activado</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">Resumen Semanal</h3>
                    <p className="text-sm text-gray-400">Recibe un resumen de tus gastos</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="resumen-notif" className="mr-2 accent-purple-600" defaultChecked />
                    <Label htmlFor="resumen-notif">Activado</Label>
                  </div>
                </div>
              </div>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Guardar Preferencias</Button>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </motion.div>
  )
}

