type Props = { params: { locale: string } }

type Locale = 'en' | 'de' | 'zh-TW'

const translations: Record<Locale, { title: string; content: string }> = {
  en: {
    title: 'Imprint',
    content: `Company: ImmoTWDE GmbH\nAddress: Musterstraße 1, 10115 Berlin\nContact: info@immotwde.example`,
  },
  de: {
    title: 'Impressum',
    content: `ImmoTWDE GmbH\nMusterstraße 1\n10115 Berlin\nTelefon: +49 30 1234567\nE‑Mail: info@immotwde.example`,
  },
  'zh-TW': {
    title: '公司資料',
    content: `公司: ImmoTWDE GmbH\n地址: Musterstraße 1, 10115 Berlin\n聯絡: info@immotwde.example`,
  },
}

export default function ImpressumLocale({ params }: Props) {
  const locale = (params.locale as Locale) ?? 'en'
  const t = translations[locale]

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <pre className="mt-4 whitespace-pre-wrap">{t.content}</pre>
    </main>
  )
}
