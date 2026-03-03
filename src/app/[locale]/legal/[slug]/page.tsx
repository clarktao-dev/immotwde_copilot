import { notFound } from 'next/navigation'

type Props = { params: { locale: string; slug: string } }

const supported = ['de', 'en', 'zh-TW']

export default function LegalLocalePage({ params }: Props) {
  const { locale, slug: rawSlug } = params
  const lang = supported.includes(locale) ? locale : 'en'
  const slug = rawSlug?.toLowerCase() || ''

  if (!slug) return notFound()

  // Simple localized headings and short introductions — replace with legal texts reviewed by counsel.
  const texts: Record<string, Record<string, { title: string; intro: string }>> = {
    impressum: {
      de: { title: 'Impressum', intro: 'Angaben gemäß § 5 TMG' },
      en: { title: 'Legal Notice', intro: 'Company information (template)' },
      'zh-TW': { title: '公司資料', intro: '根據相關法規之公司資訊（範例）' },
    },
    datenschutz: {
      de: { title: 'Datenschutzerklärung', intro: 'Schutz Ihrer personenbezogenen Daten' },
      en: { title: 'Privacy Policy', intro: 'Protection of your personal data' },
      'zh-TW': { title: '隱私權政策', intro: '關於個人資料保護' },
    },
    agb: {
      de: { title: 'Allgemeine Geschäftsbedingungen (AGB)', intro: 'Vertragsbedingungen und Hinweise' },
      en: { title: 'Terms & Conditions', intro: 'General contractual terms' },
      'zh-TW': { title: '一般交易條款 (AGB)', intro: '契約條款說明' },
    },
    widerruf: {
      de: { title: 'Widerrufsrecht', intro: 'Informationen zum Widerrufsrecht' },
      en: { title: 'Right of Withdrawal', intro: 'Information about the right to withdraw' },
      'zh-TW': { title: '撤銷權', intro: '關於撤銷權的資訊' },
    },
  }

  const key = slug.replace(/\/.*/, '')
  const entry = texts[key]
  if (!entry) return notFound()

  const t = entry[lang] ?? entry.en

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-2">{t.intro}</p>

      <section className="mt-4">
        {/* Reuse the existing German template as canonical content; ideally replace with per-locale full legal texts. */}
        {key === 'impressum' && (
          <>
            <h2 className="text-xl font-semibold">{lang === 'de' ? 'Angaben gemäß § 5 TMG' : lang === 'en' ? 'Company details' : '公司資訊'}</h2>
            <p>
              ImmoTWDE GmbH
              <br /> Musterstraße 1
              <br /> 10115 Berlin
            </p>

            <p className="mt-2">
              {lang === 'de' ? (
                <>
                  Vertreten durch: Geschäftsführer: Tao Clark
                  <br /> Handelsregister: Amtsgericht Berlin Charlottenburg, HRB 000000
                  <br /> USt-IdNr.: DE000000000
                </>
              ) : lang === 'en' ? (
                <>
                  Represented by: CEO Tao Clark
                  <br /> Commercial register: Local Court Berlin Charlottenburg, HRB 000000
                  <br /> VAT-ID: DE000000000
                </>
              ) : (
                <>
                  代表人：執行長 Tao Clark
                  <br /> 商業登記：柏林夏洛滕堡地方法院，HRB 000000
                  <br /> 增值稅號：DE000000000
                </>
              )}
            </p>

            <p className="mt-2">
              {lang === 'de' ? 'Kontakt:' : lang === 'en' ? 'Contact:' : '聯絡方式:'}
              <br /> {lang === 'de' ? 'Telefon' : lang === 'en' ? 'Phone' : '電話'}: +49 30 1234567
              <br /> E‑Mail: info@immotwde.example
            </p>
          </>
        )}

        {key === 'datenschutz' && (
          <>
            <h2 className="text-xl font-semibold">{lang === 'de' ? 'Datenschutzerklärung' : lang === 'en' ? 'Privacy Policy' : '隱私權政策'}</h2>
            <p className="mt-2">{lang === 'de' ? (
              'Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie...' 
            ) : lang === 'en' ? (
              'The protection of your personal data is important to us. Below we inform you...' 
            ) : (
              '我們重視您的個人資料保護，以下說明...' 
            )}</p>
          </>
        )}

        {key === 'agb' && (
          <>
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="mt-2">{lang === 'de' ? 'Diese Allgemeinen Geschäftsbedingungen gelten für...' : lang === 'en' ? 'These terms and conditions apply to...' : '本條款適用於...'}</p>
          </>
        )}

        {key === 'widerruf' && (
          <>
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="mt-2">{lang === 'de' ? 'Verbraucher haben ein vierzehntägiges Widerrufsrecht...' : lang === 'en' ? 'Consumers have a 14-day right of withdrawal...' : '消費者享有14天撤銷權...'}</p>
          </>
        )}

      </section>

      <section className="mt-6 text-sm text-gray-600">
        <p>
          Hinweis: Dies sind Mustertexte. Passen Sie die Inhalte an Ihre tatsächlichen Unternehmensdaten
          an und lassen Sie sie rechtlich prüfen.
        </p>
      </section>
    </main>
  )
}
