"use client"

import { useState } from "react"
import Link from "next/link"
import { HomeIcon, ListIcon, SettingsIcon, HelpCircleIcon, UserIcon, SunIcon, MoonIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "next-themes"
import ProfileCard from "@/components/dashboard/ProfileCard"
import NotificationsPopover from "@/components/dashboard/NotificationsPopover"
import SettingsDialog from "@/components/dashboard/SettingsDialog"
import HelpDialog from "@/components/dashboard/HelpDialog"

const menuItems = [
  { icon: HomeIcon, text: "Dashboard", href: "/dashboard" },
  { icon: ListIcon, text: "Movimientos", href: "/dashboard/movimientos" },
]

export function Navbar() {
  const { logout, user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="bg-gray-800/50 dark:bg-gray-800/50 backdrop-blur-md text-black dark:text-white p-4 sticky top-0 z-10 border-b border-purple-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Ticketazo
          </h1>
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center space-x-1 hover:text-purple-400 transition-colors px-3 py-2 rounded-md hover:bg-gray-700/50"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-gray-700/50 rounded-full hover:text-purple-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </Button>
          <NotificationsPopover />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="hover:bg-gray-700/50 rounded-full hover:text-purple-400"
          >
            <SettingsIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsHelpOpen(true)}
            className="hover:bg-gray-700/50 rounded-full hover:text-purple-400"
          >
            <HelpCircleIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="hover:bg-gray-700/50 rounded-full hover:text-purple-400"
          >
            <UserIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {isProfileOpen && <ProfileCard user={user} onClose={() => setIsProfileOpen(false)} onLogout={logout} />}
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <HelpDialog open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </nav>
  )
}

