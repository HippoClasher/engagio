import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Formatierte Nachricht
    const emailContent = `
Neue Beratungsanfrage von ${formData.name}

KONTAKTDATEN:
Name: ${formData.name}
E-Mail: ${formData.email}
Unternehmen: ${formData.company}

UNTERNEHMENSZIELE & STRATEGIE:
Kurzfristige Ziele: ${formData.shortTermGoals || "Nicht angegeben"}
Langfristige Ziele: ${formData.longTermGoals || "Nicht angegeben"}
Rolle von Social Media: ${formData.socialMediaRole?.length > 0 ? formData.socialMediaRole.join(", ") : "Nicht angegeben"}
Kernbotschaften: ${formData.keyMessages || "Nicht angegeben"}

ZIELGRUPPE:
Hauptzielgruppen: ${formData.targetAudience || "Nicht angegeben"}
Spezielle Zielgruppen: ${formData.specificTargets || "Nicht angegeben"}

BESTEHENDE SOCIAL MEDIA AKTIVITÄTEN:
Aktuelle Kanäle: ${formData.currentChannels?.length > 0 ? formData.currentChannels.join(", ") : "Nicht angegeben"}
Social-Media-Richtlinien: ${formData.hasGuidelines || "Nicht angegeben"}
Bisherige Erfahrungen: ${formData.pastExperience || "Nicht angegeben"}
Posting-Frequenz: ${formData.postingFrequency || "Nicht angegeben"}

CONTENT & KOMMUNIKATION:
Content-Fokus: ${formData.contentFocus?.length > 0 ? formData.contentFocus.join(", ") : "Nicht angegeben"}
Content-Stil: ${formData.contentStyle || "Nicht angegeben"}
Kommunikationstonalität: ${formData.communicationTone || "Nicht angegeben"}

KONKURRENZ & MARKT:
Hauptwettbewerber: ${formData.competitors || "Nicht angegeben"}
Inspirationen: ${formData.inspirations || "Nicht angegeben"}
Branchentrends: ${formData.industryTrends || "Nicht angegeben"}

BUDGET & RESSOURCEN:
Budget: ${formData.budget || "Nicht angegeben"}
Interne Ressourcen: ${formData.internalResources || "Nicht angegeben"}
Werbeanzeigen geplant: ${formData.paidAds || "Nicht angegeben"}

ERFOLGSMESSUNG:
Wichtige KPIs: ${formData.importantKPIs?.length > 0 ? formData.importantKPIs.join(", ") : "Nicht angegeben"}
Reporting-Frequenz: ${formData.reportingFrequency || "Nicht angegeben"}

---
Diese Anfrage wurde über das Beratungsformular auf der Website eingereicht.
    `.trim()

    // Nodemailer Transporter konfigurieren
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // z. B. smtp.strato.de
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true bei 465, false bei 587
      auth: {
        user: process.env.SMTP_USER, // kontakt@engagio-media.de
        pass: process.env.SMTP_PASS, // in .env.local ablegen
      },
    })

    // Mail verschicken
    await transporter.sendMail({
      from: `"Website Formular" <${process.env.SMTP_USER}>`,
      to: "kontakt@engagio-media.de",
      subject: `Neue Beratungsanfrage von ${formData.name} (${formData.company})`,
      text: emailContent,
    })

    return NextResponse.json({
      success: true,
      message: "Beratungsanfrage erfolgreich gesendet",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { success: false, message: "Fehler beim Senden der Anfrage" },
      { status: 500 },
    )
  }
}
