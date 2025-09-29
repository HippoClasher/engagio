import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const SECTION_CONFIG = {
  showHero: true,
  showAbout: true,
  showServices: true,
  showTestimonials: false,
  showPricing: true,
  showFAQ: true,
  showContact: true,
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header sectionConfig={SECTION_CONFIG} />
      <div className="min-h-screen">
        <main className="pt-16">
          {SECTION_CONFIG.showHero && <HeroSection />}
          {SECTION_CONFIG.showAbout && <AboutSection />}
          {SECTION_CONFIG.showServices && <ServicesSection />}
          {SECTION_CONFIG.showTestimonials && <TestimonialsSection />}
          {SECTION_CONFIG.showPricing && <PricingSection />}
          {SECTION_CONFIG.showFAQ && <FAQSection />}
          {SECTION_CONFIG.showContact && <ContactSection />}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
