"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

// Custom TikTok icon component using provided SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
  </svg>
)

// Custom Instagram icon component using provided SVG (simplified for monochrome)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 132 132" fill="currentColor">
    <path d="M66.004 18c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C18.06 51.327 18 52.964 18 66s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788 0-13.036-.06-14.672-.29-19.792-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514-1.68 1.68-3.275 2.72-5.516 3.59-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28-12.817 0-14.336-.05-19.396-.28-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.276-3.592-5.517-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52 1.68-1.68 3.28-2.72 5.52-3.592 1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97c-3.18 0-5.76 2.577-5.76 5.758 0 3.18 2.58 5.76 5.76 5.76 3.18 0 5.76-2.58 5.76-5.76 0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65 0 13.613 11.037 24.645 24.65 24.645C79.617 90.645 90.65 79.613 90.65 66S79.616 41.35 66.003 41.35zm0 8.65c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16z" />
  </svg>
)

// Custom X (Twitter) icon component using provided SVG
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 271" fill="currentColor">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
  </svg>
)

export function HeroSection() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const socialIcons = [{ icon: InstagramIcon }, { icon: TikTokIcon }, { icon: XIcon }]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % socialIcons.length)
    }, 4000) // Slowed down icon switching from 2s to 4s

    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const CurrentSocialIcon = socialIcons[currentIconIndex].icon

  return (
    <section id="hero" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none">
              Wir machen Ihr Unternehmen erfolgreich auf Social Media.
            </h3>

            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Erreichen Sie Ihre Zielgruppe dort, wo sie sich täglich aufhält.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/80 hover:text-white text-accent-foreground text-lg py-6 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
              onClick={scrollToContact}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="transition-all duration-300">Kostenlos testen</span>
              <span
                className={`overflow-hidden inline-block transition-all duration-300 ${isHovered ? "ml-2 max-w-[1.25rem]" : "ml-0 max-w-0"
                  }`}
              >
                <ArrowRight className="w-5 inline-block" size={20} />
              </span>
            </Button>
          </div>

          <div className="relative flex justify-center items-center">
            {/* Phone mockup - now visible on mobile too */}
            <div className="relative">
              <img
                src="/analytics-phone-mockup.png"
                alt="Social Media Analytics Dashboard"
                className="w-64 sm:w-80 h-auto drop-shadow-2xl"
              />

              <div className="absolute top-[8%] left-[-10%] z-20">
                <div className="w-20 h-20 bg-background border-2 border-border rounded-full flex items-center justify-center shadow-xl transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-accent">
                  <div className="transition-all duration-700 ease-in-out transform">
                    <CurrentSocialIcon className="w-8 h-8 text-foreground hover:text-accent" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[15%] right-[-10%] z-20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-green-400 hover:to-emerald-500">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl scale-150 opacity-30 pointer-events-none"></div>

          </div>
        </div>
      </div>
      <p>Test 2</p>
    </section>
  )
}
