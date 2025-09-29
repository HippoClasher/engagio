"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false)

  const handleEmailClick = () => {
    window.location.href = "mailto:kontakt@engagio-media.de?subject=Anfrage Social Media Services"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-balance">Die ersten 14 Tage sind kostenlos.</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Sie erhalten eine erste Rückmeldung innerhalb von 24 Stunden
          </p>

          {!showForm ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button
                className="bg-accent hover:bg-accent/80 hover:text-white text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                onClick={() => setShowForm(true)}
              >
                Formular öffnen
              </Button>
              <Button
                variant="outline"
                className="transition-all duration-300 hover:bg-accent/10 hover:border-accent hover:text-accent w-full sm:w-auto bg-transparent"
                onClick={handleEmailClick}
              >
                Email senden
              </Button>
            </div>
          ) : (
            <div className="bg-background border rounded-lg p-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Kontaktformular</h3>
                <p className="text-muted-foreground">Erzählen Sie uns von Ihrem Projekt</p>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="Ihr Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input id="email" type="email" placeholder="ihre@email.de" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Unternehmen</Label>
                  <Input id="company" placeholder="Ihr Unternehmen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Gewünschter Service</Label>
                  <Input id="service" placeholder="z.B. Social Media Management, Content Creation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht *</Label>
                  <Textarea
                    id="message"
                    placeholder="Beschreiben Sie Ihr Projekt und Ihre Ziele..."
                    className="min-h-32"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/80 hover:text-white text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => alert("Vielen Dank für Ihre Anfrage! Wir melden uns binnen 24 Stunden bei Ihnen.")}
                  >
                    Anfrage senden
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Zurück
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
