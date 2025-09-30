"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useRef, useState } from "react"

export function FAQSection() {
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

  const faqs = [
    {
      question: "Wie schnell sehe ich erste Ergebnisse?",
      answer:
        "Erste Verbesserungen in der Engagement-Rate sind meist schon nach 2-4 Wochen sichtbar. Signifikante Wachstumseffekte zeigen sich typischerweise nach 2-3 Monaten kontinuierlicher Arbeit.",
    },
    {
      question: "Welche Social Media Plattformen betreuen Sie?",
      answer:
        "Wir arbeiten mit allen relevanten Plattformen: Instagram, Facebook, LinkedIn, TikTok, Twitter/X, YouTube und Pinterest. Die Auswahl richtet sich nach Ihrer Zielgruppe und Ihren Geschäftszielen.",
    },
    {
      question: "Kann ich die Inhalte vor der Veröffentlichung prüfen?",
      answer:
        "Selbstverständlich! Sie erhalten alle Inhalte zur Freigabe, bevor sie veröffentlicht werden. Wir nutzen professionelle Tools für einen reibungslosen Approval-Prozess.",
    },
    {
      question: "Wie messen Sie den Erfolg der Kampagnen?",
      answer:
        "Wir verwenden umfassende Analytics-Tools und erstellen monatliche Reports mit KPIs wie Reichweite, Engagement, Follower-Wachstum, Website-Traffic und Conversions.",
    },
    {
      question: "Gibt es eine Mindestvertragslaufzeit?",
      answer:
        "Unsere Verträge sind monatlich kündbar – so bleiben Sie jederzeit flexibel. Nachhaltiger Social Media Erfolg braucht zwar Zeit, aber Sie entscheiden selbst, wie lange Sie unsere Unterstützung in Anspruch nehmen möchten.",
    },
  ]

  return (
    <section ref={sectionRef} id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={`text-center space-y-8 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">Noch Fragen?</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`border rounded-lg px-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
