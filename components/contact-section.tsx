"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [showForm, setShowForm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Basic info
    name: "",
    email: "",
    company: "",

    // Step 1: Unternehmensziele & Strategie
    shortTermGoals: "",
    longTermGoals: "",
    socialMediaRole: [] as string[],
    keyMessages: "",

    // Step 2: Zielgruppe
    targetAudience: "",
    preferredPlatforms: [] as string[],
    specificTargets: "",

    // Step 3: Bestehende Social Media Aktivitäten
    currentChannels: [] as string[],
    hasGuidelines: "",
    pastExperience: "",
    postingFrequency: "",

    // Step 4: Content & Kommunikation
    contentFocus: [] as string[],
    contentStyle: "",
    existingMaterials: [] as string[],
    communicationTone: "",

    // Step 5: Konkurrenz & Markt
    competitors: "",
    inspirations: "",
    industryTrends: "",

    // Step 6: Budget & Ressourcen
    budget: "",
    internalResources: "",
    paidAds: "",

    // Step 7: Erfolgsmessung
    importantKPIs: [] as string[],
    reportingFrequency: "",
  })
  const sectionRef = useRef<HTMLElement>(null)

  const totalSteps = 7

  const validateCurrentStep = (): string[] => {
    const stepErrors: string[] = []

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) stepErrors.push("Name ist erforderlich")
        if (!formData.email.trim()) stepErrors.push("E-Mail ist erforderlich")
        if (!formData.company.trim()) stepErrors.push("Unternehmen ist erforderlich")
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          stepErrors.push("Bitte geben Sie eine gültige E-Mail-Adresse ein")
        }
        break
      case 2:
        break
      case 3:
        break
      case 4:
        break
      case 5:
        break
      case 6:
        break
      case 7:
        break
    }

    return stepErrors
  }

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

  const handleEmailClick = () => {
    window.location.href = "mailto:kontakt@engagio-media.de?subject=Anfrage Social Media Services"
  }

  const handleWhatsAppClick = () => {
    // Hier deine WhatsApp-Nummer eintragen (mit Ländervorwahl, aber ohne + oder 0)
    window.open("https://wa.me/4915258198365?text=Hallo, ich habe eine Anfrage zu euren Social Media Services", "_blank")
  }


  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleCurrentChannelsChange = (value: string, checked: boolean) => {
    setFormData((prev) => {
      let updated: string[] = [];

      if (value === "Keine") {
        // "Keine" ausgewählt → alle anderen abwählen
        updated = checked ? ["Keine"] : [];
      } else {
        // andere Plattform ausgewählt → "Keine" abwählen
        const filtered = (prev.currentChannels || []).filter((item) => item !== "Keine");
        updated = checked ? [...filtered, value] : filtered.filter((item) => item !== value);
      }

      return { ...prev, currentChannels: updated };
    });

    if (errors.length > 0) {
      setErrors([]);
    }
  };


  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const nextStep = () => {
    const stepErrors = validateCurrentStep()
    if (stepErrors.length > 0) {
      setErrors(stepErrors)
      return
    }

    setErrors([])
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setErrors([])
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const stepErrors = validateCurrentStep()
    if (stepErrors.length > 0) {
      setErrors(stepErrors)
      return
    }

    setIsSubmitting(true)
    setErrors([])

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSuccessMessage("Vielen Dank für Ihre ausführliche Anfrage! Wir melden uns binnen 24 Stunden bei Ihnen.")

        // Reset form after successful submission
        setTimeout(() => {
          setShowForm(false)
          setCurrentStep(1)
          setSuccessMessage("")
          setFormData({
            name: "",
            email: "",
            company: "",
            shortTermGoals: "",
            longTermGoals: "",
            socialMediaRole: [],
            keyMessages: "",
            targetAudience: "",
            preferredPlatforms: [],
            specificTargets: "",
            currentChannels: [],
            hasGuidelines: "",
            pastExperience: "",
            postingFrequency: "",
            contentFocus: [],
            contentStyle: "",
            existingMaterials: [],
            communicationTone: "",
            competitors: "",
            inspirations: "",
            industryTrends: "",
            budget: "",
            internalResources: "",
            paidAds: "",
            importantKPIs: [],
            reportingFrequency: "",
          })
        }, 3000)
      } else {
        setErrors([result.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."])
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors(["Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."])
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Kontaktdaten</h3>
              <p className="text-muted-foreground">Zunächst benötigen wir Ihre Kontaktdaten</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Unternehmen *</Label>
              <Input
                id="company"
                placeholder="Ihr Unternehmen"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Unternehmensziele & Strategie</h3>
              <p className="text-muted-foreground">Erzählen Sie uns von Ihren Zielen</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortTermGoals">Was sind die kurzfristigen Ziele Ihres Unternehmens?</Label>
                <Textarea
                  id="shortTermGoals"
                  placeholder="Beschreiben Sie Ihre kurzfristigen Ziele..."
                  value={formData.shortTermGoals}
                  onChange={(e) => handleInputChange("shortTermGoals", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longTermGoals">Was sind die langfristigen Ziele Ihres Unternehmens?</Label>
                <Textarea
                  id="longTermGoals"
                  placeholder="Beschreiben Sie Ihre langfristigen Ziele..."
                  value={formData.longTermGoals}
                  onChange={(e) => handleInputChange("longTermGoals", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-3">
                <Label>Welche Rolle soll Social Media dabei spielen? (Mehrfachauswahl möglich)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Markenbekanntheit", "Lead-Generierung", "Verkauf", "Kundenbindung", "Mitarbeiteraquisite"].map(
                    (role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={role}
                          checked={formData.socialMediaRole.includes(role)}
                          onCheckedChange={(checked) => handleArrayChange("socialMediaRole", role, checked as boolean)}
                        />
                        <Label htmlFor={role} className="text-sm">
                          {role}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyMessages">Welche Botschaften oder Werte sollen besonders vermittelt werden?</Label>
                <Textarea
                  id="keyMessages"
                  placeholder="Beschreiben Sie Ihre Kernbotschaften..."
                  value={formData.keyMessages}
                  onChange={(e) => handleInputChange("keyMessages", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Zielgruppe</h3>
              <p className="text-muted-foreground">Wer sind Ihre Kunden?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetAudience">
                  Wer sind Ihre Hauptzielgruppen? (Alter, Geschlecht, Interessen, Beruf)
                </Label>
                <Textarea
                  id="targetAudience"
                  placeholder="Beschreiben Sie Ihre Zielgruppen detailliert..."
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  className="min-h-24 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specificTargets">
                  Gibt es spezielle Zielgruppen, die Sie gezielt erreichen möchten?
                </Label>
                <Textarea
                  id="specificTargets"
                  placeholder="Beschreiben Sie spezielle Zielgruppen..."
                  value={formData.specificTargets}
                  onChange={(e) => handleInputChange("specificTargets", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Bestehende Social Media Aktivitäten</h3>
              <p className="text-muted-foreground">Was machen Sie bereits?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Welche Social-Media-Kanäle nutzen Sie derzeit? (Mehrfachauswahl möglich)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube", "Twitter/X", "Keine"].map((channel) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${channel}`}
                        checked={formData.currentChannels.includes(channel)}
                        onCheckedChange={(checked) =>
                          handleCurrentChannelsChange(channel, checked as boolean)
                        }
                      />
                      <Label htmlFor={`current-${channel}`} className="text-sm">
                        {channel}
                      </Label>
                    </div>
                  ))}

                </div>
              </div>
              <div className="space-y-3">
                <Label>Haben Sie bereits Social-Media-Richtlinien oder ein Corporate Design?</Label>
                <RadioGroup
                  value={formData.hasGuidelines}
                  onValueChange={(value) => handleInputChange("hasGuidelines", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ja" id="guidelines-yes" />
                    <Label htmlFor="guidelines-yes">Ja, vollständig</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teilweise" id="guidelines-partial" />
                    <Label htmlFor="guidelines-partial">Teilweise</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nein" id="guidelines-no" />
                    <Label htmlFor="guidelines-no">Nein</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pastExperience">Was hat in der Vergangenheit gut funktioniert, und was nicht?</Label>
                <Textarea
                  id="pastExperience"
                  placeholder="Teilen Sie Ihre Erfahrungen mit uns..."
                  value={formData.pastExperience}
                  onChange={(e) => handleInputChange("pastExperience", e.target.value)}
                  className="min-h-24 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postingFrequency">Wie ist die aktuelle Posting-Frequenz und Content-Art?</Label>
                <Textarea
                  id="postingFrequency"
                  placeholder="z.B. 3x pro Woche, hauptsächlich Bilder und Stories..."
                  value={formData.postingFrequency}
                  onChange={(e) => handleInputChange("postingFrequency", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Content & Kommunikation</h3>
              <p className="text-muted-foreground">Wie soll Ihr Content aussehen?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Welche Inhalte sollen im Vordergrund stehen? (Mehrfachauswahl möglich)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Produktinfos",
                    "Storytelling",
                    "Behind-the-Scenes",
                    "Tutorials",
                    "Kundenstimmen",
                    "Branchennews",
                    "Stellenangebote",
                  ].map((content) => (
                    <div key={content} className="flex items-center space-x-2">
                      <Checkbox
                        id={`content-${content}`}
                        checked={formData.contentFocus.includes(content)}
                        onCheckedChange={(checked) => handleArrayChange("contentFocus", content, checked as boolean)}
                      />
                      <Label htmlFor={`content-${content}`} className="text-sm">
                        {content}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Soll der Content eher informativ, unterhaltend oder werblich sein?</Label>
                <RadioGroup
                  value={formData.contentStyle}
                  onValueChange={(value) => handleInputChange("contentStyle", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="informativ" id="style-informative" />
                    <Label htmlFor="style-informative">Informativ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unterhaltend" id="style-entertaining" />
                    <Label htmlFor="style-entertaining">Unterhaltend</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="werblich" id="style-promotional" />
                    <Label htmlFor="style-promotional">Werblich</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gemischt" id="style-mixed" />
                    <Label htmlFor="style-mixed">Gemischt</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="communicationTone">Wie soll die Tonalität der Kommunikation sein?</Label>
                <Input
                  id="communicationTone"
                  placeholder="z.B. locker, professionell, humorvoll, freundlich..."
                  value={formData.communicationTone}
                  onChange={(e) => handleInputChange("communicationTone", e.target.value)}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Konkurrenz & Markt</h3>
              <p className="text-muted-foreground">Wer sind Ihre Mitbewerber?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="competitors">Wer sind Ihre Hauptwettbewerber?</Label>
                <Textarea
                  id="competitors"
                  placeholder="Nennen Sie Ihre wichtigsten Konkurrenten..."
                  value={formData.competitors}
                  onChange={(e) => handleInputChange("competitors", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspirations">
                  Gibt es Branchenbeispiele oder Mitbewerber, deren Social Media Ihnen gefällt?
                </Label>
                <Textarea
                  id="inspirations"
                  placeholder="Teilen Sie Beispiele, die Sie inspirieren..."
                  value={formData.inspirations}
                  onChange={(e) => handleInputChange("inspirations", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industryTrends">
                  Welche Trends oder Themen in Ihrer Branche sind besonders relevant?
                </Label>
                <Textarea
                  id="industryTrends"
                  placeholder="Beschreiben Sie relevante Branchentrends..."
                  value={formData.industryTrends}
                  onChange={(e) => handleInputChange("industryTrends", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Budget, Ressourcen & Erfolgsmessung</h3>
              <p className="text-muted-foreground">Lassen Sie uns über Rahmen und Ziele sprechen</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Welches Budget steht für Social Media Marketing zur Verfügung?</Label>
                <Input
                  id="budget"
                  placeholder="z.B. 500-1000€ pro Monat"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="internalResources">Welche internen Ressourcen können wir nutzen?</Label>
                <Textarea
                  id="internalResources"
                  placeholder="z.B. Mitarbeiter für Fotos, bestehende Inhalte, Produktbilder..."
                  value={formData.internalResources}
                  onChange={(e) => handleInputChange("internalResources", e.target.value)}
                  className="min-h-20 transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-3">
                <Label>Sind Werbeanzeigen auf Social Media geplant (Paid Ads)?</Label>
                <RadioGroup value={formData.paidAds} onValueChange={(value) => handleInputChange("paidAds", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ja" id="ads-yes" />
                    <Label htmlFor="ads-yes">Ja, definitiv</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vielleicht" id="ads-maybe" />
                    <Label htmlFor="ads-maybe">Vielleicht später</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nein" id="ads-no" />
                    <Label htmlFor="ads-no">Nein</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label>Welche KPIs sind für Sie am wichtigsten? (Mehrfachauswahl möglich)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Reichweite", "Engagement", "Klicks", "Leads", "Verkäufe", "Follower-Wachstum"].map((kpi) => (
                    <div key={kpi} className="flex items-center space-x-2">
                      <Checkbox
                        id={`kpi-${kpi}`}
                        checked={formData.importantKPIs.includes(kpi)}
                        onCheckedChange={(checked) => handleArrayChange("importantKPIs", kpi, checked as boolean)}
                      />
                      <Label htmlFor={`kpi-${kpi}`} className="text-sm">
                        {kpi}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Wie oft möchten Sie Reports oder Analysen erhalten?</Label>
                <RadioGroup
                  value={formData.reportingFrequency}
                  onValueChange={(value) => handleInputChange("reportingFrequency", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wöchentlich" id="report-weekly" />
                    <Label htmlFor="report-weekly">Wöchentlich</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monatlich" id="report-monthly" />
                    <Label htmlFor="report-monthly">Monatlich</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quartalsweise" id="report-quarterly" />
                    <Label htmlFor="report-quarterly">Quartalsweise</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 mb-16 md:mb-0">
      <div className="container mx-auto px-4">
        <div
          className={`text-center space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">Die ersten 14 Tage sind kostenlos.</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Sie erhalten eine erste Rückmeldung innerhalb von 24 Stunden
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              className="bg-accent hover:bg-background hover:text-accent hover:border-accent border-2 border-accent text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              onClick={() => setShowForm(true)}
            >
              Beratungsformular öffnen
            </Button>
            <Button
              variant="outline"
              className="transition-all duration-300 hover:bg-accent/10 hover:border-accent hover:text-accent w-full sm:w-auto bg-transparent"
              onClick={handleEmailClick}
            >
              Email senden
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 transition-all duration-300 hover:bg-green-50 hover:border-green-500 hover:text-green-600 w-full sm:w-auto bg-transparent"
              onClick={handleWhatsAppClick}
            >
              <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
              WhatsApp schreiben
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-background border rounded-lg p-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800">{successMessage}</p>
                </div>
              )}

              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-800 font-medium mb-2">Bitte korrigieren Sie folgende Fehler:</h4>
                      <ul className="text-red-700 space-y-1">
                        {errors.map((error, index) => (
                          <li key={index} className="text-sm">
                            • {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    Schritt {currentStep} von {totalSteps}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((currentStep / totalSteps) * 100)}% abgeschlossen
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              {renderStep()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={currentStep === 1 ? () => setShowForm(false) : prevStep}
                  className="transition-all duration-300 hover:bg-accent/10 hover:border-accent hover:text-accent"
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {currentStep === 1 ? "Zurück" : "Vorheriger Schritt"}
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="bg-accent hover:bg-accent/80 hover:text-white text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    Nächster Schritt
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-accent hover:bg-accent/80 hover:text-white text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Beratungsanfrage senden"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
