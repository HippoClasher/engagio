"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Camera, Target, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function ServicesSection() {
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

  const services = [
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Social Media Management",
      description: "Professionelle Betreuung Ihrer Social Media Kanäle mit strategischer Planung und täglicher Pflege.",
    },
    {
      icon: <Camera className="h-8 w-8 text-accent" />,
      title: "Content Creation",
      description:
        "Kreative und ansprechende Inhalte, die Ihre Marke zum Leben erwecken und Ihre Zielgruppe begeistern.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Ad Campaigns",
      description: "Zielgerichtete Werbekampagnen, die Ihre Reichweite maximieren und messbare Ergebnisse liefern.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Analytics & Reporting",
      description:
        "Detaillierte Analysen und transparente Berichte über die Performance Ihrer Social Media Aktivitäten.",
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`text-center space-y-8 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">Umfassende Lösungen für all Ihre Bedürfnisse.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`text-center transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <CardHeader className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-accent/20">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
