"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import Link from "next/link"

export default function ProfileCard({ user, onClose, onLogout }) {
  return (
    <Card className="absolute right-4 top-16 w-64 p-4 bg-gray-800 border-gray-700 text-white z-50 shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
          <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user?.name || "Usuario"}</h3>
          <p className="text-sm text-gray-400">{user?.email || "usuario@ejemplo.com"}</p>
        </div>
      </div>
      <Link href="/dashboard/perfil" onClick={onClose}>
        <Button variant="outline" className="w-full mb-2">
          Ver perfil
        </Button>
      </Link>
      <Button variant="ghost" className="w-full text-red-400" onClick={onLogout}>
        <LogOutIcon className="mr-2 h-4 w-4" /> Cerrar sesión
      </Button>
    </Card>
  )
}

