type Props = { params: { locale: string } }

const translations: Record<string, { title: string; placeholder: string }> = {
  en: { title: 'Contact', placeholder: 'Write your message...' },
  de: { title: 'Kontakt', placeholder: 'Schreiben Sie Ihre Nachricht...' },
  'zh-TW': { title: '聯絡我們', placeholder: '輸入您的訊息...' },
}

export default function ContactLocale({ params }: Props) {
  const locale = params.locale
  const t = translations[locale] ?? translations.en
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <form className="mt-4 max-w-xl">
        <textarea placeholder={t.placeholder} className="w-full h-36 p-2 border" />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white">
          Send
        </button>
      </form>
    </main>
  )
}
