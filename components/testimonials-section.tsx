"use client"

import { Quote, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const testimonials = [
    {
      name: "Sarah Müller",
      company: "TechStart GmbH",
      quote:
        "engagio hat unsere Social Media Präsenz komplett transformiert. Die Engagement-Rate ist um 300% gestiegen und wir erreichen endlich unsere Zielgruppe.",
      image: "/professional-woman-smiling.png",
    },
    {
      name: "Michael Weber",
      company: "Weber Consulting",
      quote:
        "Das Team von engagio versteht es perfekt, unsere Markenidentität in den sozialen Medien zu transportieren. Professionell, kreativ und zuverlässig.",
      image: "/professional-man-suit.png",
    },
    {
      name: "Lisa Schmidt",
      company: "Fashion Forward",
      quote:
        "Dank engagio konnten wir unsere Online-Verkäufe verdoppeln. Die Content-Strategie ist genau auf unsere Zielgruppe abgestimmt.",
      image: "/young-woman-entrepreneur.png",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={sectionRef} id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Large quote icon */}
            <div className="flex justify-center mb-8">
              <Quote className="h-16 w-16 text-accent fill-current" />
            </div>

            {/* Quote text */}
            <blockquote className="text-2xl lg:text-3xl leading-relaxed text-pretty mb-12">
              {currentTestimonial.quote}
            </blockquote>

            {/* Name, profile picture, and navigation */}
            <div className="flex items-center justify-center space-x-6">
              <img
                src={currentTestimonial.image || "/placeholder.svg"}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-medium text-lg">{currentTestimonial.name}</div>
                <div className="text-sm text-muted-foreground">{currentTestimonial.company}</div>
              </div>
              <button
                onClick={nextTestimonial}
                className="ml-4 p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-accent" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
