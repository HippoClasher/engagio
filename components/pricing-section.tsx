"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Percent } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [discountActive, setDiscountActive] = useState(true)
  const [discountType, setDiscountType] = useState<"percentage" | "absolute">("percentage")
  const [discountValue, setDiscountValue] = useState(50) // 20% or 20€

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

  const basePlans = [
    {
      name: "Starter",
      basePrice: 300,
      period: "/Monat",
      description: "Perfekt für kleine Unternehmen",
      features: ["4 Beiträge pro Monat", "E-Mail Support", "Community Management (Kommentare/Nachrichten)"],
    },
    {
      name: "Professional",
      basePrice: 600,
      period: "/Monat",
      description: "Ideal für wachsende Unternehmen",
      features: [
        "8 Beiträge pro Monat",
        "Email / WhatsApp Support",
        "Community Management (Kommentare/Nachrichten)",
        "Content-Strategie",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      basePrice: 1000,
      period: "/Monat",
      description: "Für etablierte Unternehmen",
      features: [
        "16 Beiträge pro Monat",
        "Email / WhatsApp Support",
        "Community Management (Kommentare/Nachrichten)",
        "Individuelle Strategie",
        "Analytics & Reporting",
        "Ad Campaigns",
      ],
    },
  ]

  const calculateDiscountedPrice = (basePrice: number) => {
    if (!discountActive) return basePrice

    if (discountType === "percentage") {
      return Math.round(basePrice * (1 - discountValue / 100) - 1)
    } else {
      return Math.max(0, basePrice - discountValue)
    }
  }

  const plans = basePlans.map((plan) => ({
    ...plan,
    originalPrice: plan.basePrice,
    price: calculateDiscountedPrice(plan.basePrice),
    hasDiscount: discountActive && calculateDiscountedPrice(plan.basePrice) < plan.basePrice,
  }))

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={sectionRef} id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`text-center space-y-8 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h6 className="text-4xl lg:text-5xl font-bold text-balance">
            Transparente Preise, authentische Social Media Auftritte.
          </h6>

          {discountActive && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
              <span className="font-medium">
                {discountType === "percentage"
                  ? `Nur für kurze Zeit: ${discountValue}% Rabatt auf alle Pakete!`
                  : ` ${discountValue}€ Rabatt auf alle Pakete!`}
              </span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-500 hover:shadow-xl hover:border-accent/50 ${
                plan.popular ? "border-accent scale-105" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium inline-block whitespace-nowrap">
                    Am beliebtesten
                  </span>
                </div>
              )}
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {plan.hasDiscount && (
                      <div className="text-lg text-muted-foreground line-through mb-1">{plan.originalPrice}€</div>
                    )}
                    {plan.price}€<span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3 transition-transform duration-200 hover:translate-x-2"
                    >
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                    plan.popular
                      ? "bg-accent hover:bg-background hover:text-accent hover:border-accent border-2 border-accent text-accent-foreground"
                      : "hover:bg-accent/10 hover:border-accent hover:text-accent"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={scrollToContact}
                >
                  Jetzt starten
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
