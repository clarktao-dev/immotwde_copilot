import { notFound } from 'next/navigation'

export default function LegalPage({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug?.toLowerCase()

  if (!slug) return notFound()

  if (slug === 'impressum') {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Impressum</h1>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
          <p>
            ImmoTWDE GmbH
            <br /> Musterstraße 1
            <br /> 10115 Berlin
          </p>

          <p>
            Vertreten durch: Geschäftsführer: Tao Clark
            <br /> Handelsregister: Amtsgericht Berlin Charlottenburg, HRB 000000
            <br /> USt-IdNr.: DE000000000
          </p>

          <p>
            Kontakt:
            <br /> Telefon: +49 30 1234567
            <br /> E‑Mail: info@immotwde.example
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf rechtswidrige
            Aktivitäten hinweisen.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr. Wir sind zur Teilnahme an einem Streitbeilegungsverfahren
            vor einer Verbraucherschlichtungsstelle weder bereit noch verpflichtet.
          </p>
        </section>

        <section className="mt-4">
          <p>
            Hinweis: Die obigen Angaben sind Musterangaben. Bitte überprüfen und ersetzen Sie sie mit Ihren
            echten Firmendaten und lassen Sie den Inhalt von einem Rechtsanwalt prüfen, um vollständige
            Rechtskonformität sicherzustellen.
          </p>
        </section>
      </main>
    )
  }

  if (slug === 'datenschutz') {
    return (
      <main style={{ padding: 24 }}>
        <h1>Datenschutzerklärung</h1>

        <p style={{ marginTop: 12 }}>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie ausführlich
          über den Umgang mit Ihren Daten.
        </p>

        <section style={{ marginTop: 16 }}>
          <h2>Verantwortlicher</h2>
          <p>
            ImmoTWDE GmbH
            <br /> Musterstraße 1, 10115 Berlin
            <br /> E‑Mail: privacy@immotwde.example
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
          <p>
            Beim Besuch der Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser
            automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden
            temporär in einem sogenannten Logfile gespeichert. Folgende Informationen werden dabei ohne
            Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:
          </p>
          <ul>
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit der Anfrage</li>
            <li>Zeichenfolge der abgerufenen Datei</li>
            <li>Browsertyp und Version</li>
            <li>Website, von der die Anforderung kommt</li>
          </ul>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Kontaktformular und E‑Mail‑Kontakt</h2>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
            nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Cookies</h2>
          <p>
            Unsere Website verwendet Cookies. Cookies sind kleine Dateien, die Ihr Browser automatisch
            erstellt und die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite besuchen.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Ihre Rechte</h2>
          <p>
            Sie haben das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu
            verlangen, sowie das Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung und
            Datenübertragbarkeit. Ergänzend haben Sie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <p>
            Hinweis: Diese Datenschutzerklärung ist ein Mustertext. Passen Sie die Inhalte an die konkreten
            Datenverarbeitungen Ihrer Website an und lassen Sie die Erklärung von einem Datenschutzbeauftragten
            oder Rechtsanwalt prüfen.
          </p>
        </section>
      </main>
    )
  }

  if (slug === 'agb') {
    return (
      <main style={{ padding: 24 }}>
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

        <section style={{ marginTop: 16 }}>
          <h2>Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen ImmoTWDE GmbH und Kunden.</p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Vertragsabschluss</h2>
          <p>
            Die Darstellung der Immobilienangebote auf der Website stellt kein rechtlich bindendes Angebot dar.
            Mit der Kontaktaufnahme oder Buchungsanfrage geben Sie eine verbindliche Bestellung ab.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Preise und Zahlung</h2>
          <p>
            Angaben zu Preisen verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Akzeptierte Zahlungsarten
            sind: Überweisung, PayPal, Kreditkarte (Stripe). Bei Überweisung gilt die Zahlung erst nach
            Gutschrift auf unserem Konto als erfolgt.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Widerruf</h2>
          <p>
            Information zum Widerrufsrecht finden Sie gesondert in der Widerrufsbelehrung.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <p>
            Hinweis: Dies ist eine allgemeine Vorlage. Bitte lassen Sie die AGB von einem Rechtsanwalt prüfen
            und an Ihr Geschäftsmodell anpassen.
          </p>
        </section>
      </main>
    )
  }

  if (slug === 'widerruf') {
    return (
      <main style={{ padding: 24 }}>
        <h1>Widerrufsrecht</h1>

        <section style={{ marginTop: 16 }}>
          <p>
            Verbraucher haben ein vierzehntägiges Widerrufsrecht bei Fernabsatzverträgen. Die Frist beginnt mit
            dem Tag des Vertragsabschlusses.
          </p>

          <h2 style={{ marginTop: 12 }}>Widerrufsbelehrung</h2>
          <p>
            Sie können Ihre Vertragserklärung innerhalb von 14 Tagen ohne Angabe von Gründen in Textform (z.B. E‑Mail)
            oder durch Rücksendung der Ware widerrufen.
          </p>

          <h3 style={{ marginTop: 12 }}>Folgen des Widerrufs</h3>
          <p>
            Im Falle eines wirksamen Widerrufs werden bereits geleistete Zahlungen zurückerstattet. Kosten für die
            Rücksendung trägt der Kunde, soweit nicht anders vereinbart.
          </p>
        </section>

        <section style={{ marginTop: 16 }}>
          <p>
            Hinweis: Diese Widerrufsbelehrung ist eine Vorlage. Passen Sie die genauen Fristen und Abläufe an Ihr
            Angebot an und lassen Sie die Texte rechtlich prüfen.
          </p>
        </section>
      </main>
    )
  }

  return notFound()
}
