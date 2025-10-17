export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">Impressum</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 DDG</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Nils Julian Tekülve</p>
                <p>Heiligenstädter Straße 6a</p>
                <p>46359 Heiden</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Vertreten durch:</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Nils Julian Tekülve</p>
                <p>Louis Schleif</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Kontakt:</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Telefon: 01718396889</p>
                <p>E-Mail: kontakt@engagio-media.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Haftungsausschluss:</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Haftung für Inhalte</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
                    Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                    zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
                    Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                    diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                    Inhalte umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-3">Haftung für Links</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die 
                    Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. 
                    Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige 
                    Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten 
                    Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
                    Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-3">Urheberrecht</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                    deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                    Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                    die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                    Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                    entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                    umgehend entfernen.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
