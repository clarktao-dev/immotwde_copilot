import Link from 'next/link'

type Props = { params: { locale: string } }

const translations: Record<string, { title: string; body: string }> = {
  en: {
    title: 'About Us',
    body:
      'ImmoTWDE connects clients between Taiwan and Germany for residential and commercial real estate. Our team combines local expertise with international experience to deliver excellent service.',
  },
  de: {
    title: 'Über uns',
    body:
      'ImmoTWDE verbindet Kunden zwischen Taiwan und Deutschland im Wohn- und Gewerbeimmobilienbereich. Unser Team kombiniert lokale Expertise mit internationaler Erfahrung, um exzellenten Service zu bieten.',
  },
  'zh-TW': {
    title: '關於我們',
    body: 'ImmoTWDE 連結台灣與德國的住宅與商業房地產客戶。我們的團隊結合在地專業與國際經驗，提供優質服務。',
  },
}

export default function AboutLocale({ params }: Props) {
  const locale = params.locale
  const t = translations[locale] ?? translations.en

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-4">{t.body}</p>

      <nav className="mt-6 space-x-4">
        <Link href={`/${locale}/services`}>Services</Link>
        <Link href={`/${locale}/blog`}>Blog</Link>
        <Link href={`/${locale}/news`}>News</Link>
        <Link href={`/${locale}/contact`}>Contact</Link>
      </nav>
    </main>
  )
}
