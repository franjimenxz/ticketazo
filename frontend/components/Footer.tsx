"use client"

import { motion } from "framer-motion"

const footerSections = [
  {
    title: "Producto",
    links: [
      { name: "Características", href: "#" },
      { name: "Precios", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre nosotros", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contacto", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacidad", href: "#" },
      { name: "Términos", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold mb-4">Ticketazo 💰</h3>
            <p className="text-gray-400">La forma más cool de manejar tus gastos en Argentina con WhatsApp.</p>
          </motion.div>
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-purple-400 transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Ticketazo. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}

