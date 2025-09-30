"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <button
              onClick={scrollToTop}
              className="inline-block hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
              <Logo width={160} height={50} />
            </button>
            <p className="text-muted-foreground leading-relaxed">
              Ihre Social Media Agentur für nachhaltigen digitalen Erfolg.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/engagio.media/"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:bg-accent/10 p-2 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Rechtliches</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/impressum" className="hover:text-accent transition-all duration-300 hover:translate-x-1">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-accent transition-all duration-300 hover:translate-x-1">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 engagio. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
