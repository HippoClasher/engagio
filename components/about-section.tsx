"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">Das sind wir.</h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed mt-8">
              Als zwei engagierte duale Studenten setzen wir unser Wissen und unsere Erfahrung mit den verschiedenen Social-Media-Plattformen gezielt ein, um insbesondere kleinen und mittelständischen Unternehmen zu helfen, Social Media als wirkungsvolles Werkzeug zur Erreichung ihrer Ziele zu nutzen – sei es zur Kundengewinnung oder zur Mitarbeitersuche. Wir freuen uns darauf, Sie als einer unser ersten Partner zu gewinnen und gemeinsam erfolgreiche Social-Media-Projekte umzusetzen. 
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
