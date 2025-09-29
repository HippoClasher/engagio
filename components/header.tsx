"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

interface HeaderProps {
  sectionConfig: {
    showHero: boolean
    showAbout: boolean
    showServices: boolean
    showTestimonials: boolean
    showPricing: boolean
    showFAQ: boolean
    showContact: boolean
  }
}

export function Header({ sectionConfig }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [hideNavLinks, setHideNavLinks] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [shouldShowHamburger, setShouldShowHamburger] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)

      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect()
        setShowCTA(heroRect.bottom < 100)
      }

      const visibleSections = ["hero"]
      if (sectionConfig.showAbout) visibleSections.push("about")
      if (sectionConfig.showServices) visibleSections.push("services")
      if (sectionConfig.showTestimonials) visibleSections.push("testimonials")
      if (sectionConfig.showPricing) visibleSections.push("pricing")
      if (sectionConfig.showFAQ) visibleSections.push("faq")
      if (sectionConfig.showContact) visibleSections.push("contact")

      const viewportTop = window.scrollY
      const viewportCenter = viewportTop + window.innerHeight / 2
      let currentActiveSection = "hero"

      let minDistance = Number.POSITIVE_INFINITY

      for (const sectionId of visibleSections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + viewportTop
          const sectionCenter = sectionTop + rect.height / 2
          const distance = Math.abs(sectionCenter - viewportCenter)

          if (distance < minDistance && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            minDistance = distance
            currentActiveSection = sectionId
          }
        }
      }

      setActiveSection(currentActiveSection)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionConfig])

  useEffect(() => {
    const updateHighlight = () => {
      if (activeSection === "hero") {
        setHighlightStyle({ left: 0, width: 0 })
        return
      }

      const activeLink = linkRefs.current[activeSection]
      if (activeLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()

        setHighlightStyle({
          left: linkRect.left - navRect.left - 12,
          width: linkRect.width + 24,
        })
      }
    }

    const timeoutId = setTimeout(updateHighlight, 100)
    return () => clearTimeout(timeoutId)
  }, [activeSection, hideNavLinks])

  useEffect(() => {
    const handleResize = () => {
      if (activeSection === "hero") {
        setHighlightStyle({ left: 0, width: 0 })
        return
      }

      const activeLink = linkRefs.current[activeSection]
      if (activeLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()

        setHighlightStyle({
          left: linkRect.left - navRect.left - 12,
          width: linkRect.width + 24,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeSection])

  useEffect(() => {
    const checkHeaderFit = () => {
      if (window.innerWidth >= 1260) {
        // statt 768
        setShouldShowHamburger(false)
        return
      }

      const header = headerRef.current
      if (!header) return

      const logo = header.querySelector('a[href="#hero"]')
      const themeToggle = header.querySelector("[data-theme-toggle]") || header.querySelector("button")
      const ctaButton = header.querySelector("button:not([data-theme-toggle])")

      if (!logo || !themeToggle) return

      const logoWidth = logo.getBoundingClientRect().width
      const themeToggleWidth = themeToggle.getBoundingClientRect().width
      const ctaButtonWidth = ctaButton ? ctaButton.getBoundingClientRect().width : 0
      const padding = 32
      const spacing = 16

      const requiredWidth = logoWidth + themeToggleWidth + ctaButtonWidth + padding + spacing * 2
      const availableWidth = window.innerWidth

      setShouldShowHamburger(requiredWidth > availableWidth)
    }

    checkHeaderFit()
    window.addEventListener("resize", checkHeaderFit)
    return () => window.removeEventListener("resize", checkHeaderFit)
  }, [showCTA])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const middle = absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2

      window.scrollTo({
        top: middle,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  const navigationItems = [
    { id: "about", label: "Über uns", show: sectionConfig.showAbout },
    { id: "services", label: "Services", show: sectionConfig.showServices },
    { id: "testimonials", label: "Kundenstimmen", show: sectionConfig.showTestimonials },
    { id: "pricing", label: "Preise", show: sectionConfig.showPricing },
    { id: "faq", label: "FAQ", show: sectionConfig.showFAQ },
    { id: "contact", label: "Kontakt", show: sectionConfig.showContact },
  ].filter((item) => item.show)

  return (
    <>
      {/* Desktop Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 hidden min-[1260px]:block ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("hero")
            }}
            className="hover:opacity-80 transition-opacity duration-300 mr-8 flex-shrink-0"
          >
            <Logo width={140} height={45} />
          </Link>

          {!hideNavLinks && (
            <nav ref={navRef} className="flex items-center space-x-10 relative">
              {highlightStyle.width > 0 && (
                <div
                  className="absolute bg-accent/30 rounded-lg h-10 transition-all duration-300 ease-out -z-10"
                  style={{
                    left: `${highlightStyle.left}px`,
                    width: `${highlightStyle.width}px`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              )}

              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  ref={(el) => {
                    linkRefs.current[item.id] = el
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  className={`px-3 py-2 transition-colors duration-300 whitespace-nowrap relative z-10 ${activeSection === item.id ? "text-accent font-medium" : "text-foreground hover:text-accent"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-6 ml-8 flex-shrink-0">
            <ThemeToggle />
            {showCTA && (
              <Button
                className="bg-accent hover:bg-accent/80 hover:text-white text-accent-foreground transition-all duration-300 animate-in fade-in slide-in-from-top-2 whitespace-nowrap shadow-lg hover:shadow-xl"
                onClick={() => scrollToSection("contact")}
              >
                Kostenlos testen
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 block min-[1260px]:hidden ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background/80 backdrop-blur-md border-b"
          }`}
      >

        <div className="w-full max-w-full px-4 h-16 flex items-center justify-between overflow-hidden">
          <Link
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("hero")
            }}
            className="hover:opacity-80 transition-opacity duration-300 min-w-0"
          >
            <Logo className="h-8 w-auto max-w-[120px] shrink" />
          </Link>

          <div className="flex items-center space-x-2 min-w-0 overflow-hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log("[v0] Hamburger menu clicked")
                setIsMobileMenuOpen(true)
              }}
              className="text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 flex-shrink-0"
              aria-label="Menu öffnen"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] xl:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-md animate-in fade-in duration-300"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("[v0] Background overlay clicked")
              setIsMobileMenuOpen(false)
            }}
          />

          {/* Fullscreen menu container */}
          <div className="relative h-screen w-screen flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
            {/* Top header row inside menu */}
            <div className="flex items-center justify-between p-4 border-b w-full">
              <Link
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                }}
                className="hover:opacity-80 transition-opacity duration-300 min-w-0"
              >
                <Logo className="h-10 w-auto max-w-[140px] shrink" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log("[v0] Close button clicked")
                  setIsMobileMenuOpen(false)
                }}
                className="text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                aria-label="Menu schließen"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 flex flex-col justify-center space-y-8 px-8 w-full">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    console.log(`[v0] Navigation link clicked: ${item.id}`)
                    scrollToSection(item.id)
                  }}
                  className="text-2xl font-medium text-foreground hover:text-accent transition-colors duration-300 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA button pinned to bottom */}
            <div className="p-8 w-full flex-shrink-0">
              <Button
                className="w-full bg-accent hover:bg-background hover:text-accent hover:border-accent border-2 border-accent text-accent-foreground text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  console.log("[v0] CTA button clicked")
                  scrollToSection("contact")
                }}
              >
                Kostenlos testen
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
