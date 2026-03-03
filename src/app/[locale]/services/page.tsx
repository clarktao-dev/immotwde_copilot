type Props = { params: { locale: string } }

const translations: Record<string, { title: string; body: string }> = {
  en: { title: 'Services', body: 'We offer property search, consulting, and transaction support.' },
  de: { title: 'Dienstleistungen', body: 'Wir bieten Immobiliensuche, Beratung und Transaktionsunterstützung an.' },
  'zh-TW': { title: '服務項目', body: '我們提供房屋搜尋、諮詢與交易協助。' },
}

export default function ServicesLocale({ params }: Props) {
  const locale = params.locale
  const t = translations[locale] ?? translations.en
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-4">{t.body}</p>
    </main>
  )
}
