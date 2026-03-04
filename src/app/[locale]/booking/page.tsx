"use client"
import React, { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

type Props = { params: { locale: string } }

export default function Booking({ params }: Props) {
  const locale = params.locale || 'en'
  const [step, setStep] = useState<number>(1)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const titles: Record<string, string> = {
    en: 'Booking',
    de: 'Buchen',
    'zh-TW': '預約',
  }

  const stepTitles: Record<number, Record<string, string>> = {
    1: { en: 'Tell us about your needs', de: 'Sagen Sie uns, was Sie brauchen', 'zh-TW': '告訴我們您的需求' },
    2: { en: 'Your contact details', de: 'Ihre Kontaktdaten', 'zh-TW': '聯絡資訊' },
    3: { en: 'Choose time', de: 'Wählen Sie eine Zeit', 'zh-TW': '選擇時間' },
    4: { en: 'Thank you', de: 'Danke', 'zh-TW': '謝謝您' },
  }

  // Configure Cal.com values
  const namespace = '15min'
  const calLinkPath: Record<string, string> = {
    en: 'immotwde/15min',
    de: 'immotwde/15min',
    'zh-TW': 'immotwde/15min',
  }
  const calFullUrl: Record<string, string> = {
    en: 'https://cal.eu/immotwde/15min',
    de: 'https://cal.eu/immotwde/15min',
    'zh-TW': 'https://cal.eu/immotwde/15min',
  }

  useEffect(() => {
    ;(async () => {
      try {
        const cal = await getCalApi({ namespace })
        // keep default ui options; no locale prop passed to avoid type mismatch
        cal('ui', { layout: 'month_view', hideEventTypeDetails: false })
      } catch (e) {
        // ignore
        // eslint-disable-next-line no-console
        console.warn('cal init failed', e)
      }
    })()
  }, [locale])

  const questions: Record<string, Record<string, string[]>> = {
    en: {
      q1: ['Buy a property', 'Sell a property', 'General advice'],
    },
    de: {
      q1: ['Immobilie kaufen', 'Immobilie verkaufen', 'Allgemeine Beratung'],
    },
    'zh-TW': {
      q1: ['購買房產', '出售房產', '一般諮詢'],
    },
  }

  function toggleAnswer(key: string) {
    setAnswers((a) => ({ ...a, [key]: !a[key] }))
  }

  function canProceedToContact() {
    // require at least one answer selected
    return Object.values(answers).some(Boolean)
  }

  function submitContact() {
    // basic validation
    if (!form.name || !form.email) return
    setStep(3)
  }

  const calLinkForEmbed = calLinkPath[locale] ?? calLinkPath.en
  const calFullUrlWithLocale = `${calFullUrl[locale] ?? calFullUrl.en}?locale=${encodeURIComponent(locale)}`

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{titles[locale] ?? titles.en}</h1>
      <h2 className="mt-2 text-lg">{stepTitles[step]?.[locale] ?? stepTitles[step].en}</h2>

      <div className="mt-6 max-w-xl">
        {step === 1 && (
          <section>
            <p className="mb-3 text-sm text-gray-700">
              {locale === 'de' ? 'Bitte wählen Sie die passende Option:' : locale === 'zh-TW' ? '請選擇適合的選項：' : 'Please select the options that match:'}
            </p>

            <div className="space-y-2">
              {(questions[locale]?.q1 ?? questions.en.q1).map((opt, i) => {
                const key = `q1_${i}`
                return (
                  <label key={key} className="flex items-center gap-2">
                    <input type="checkbox" checked={!!answers[key]} onChange={() => toggleAnswer(key)} />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-gray-200" onClick={() => setStep(1)}>{locale === 'de' ? 'Zurück' : locale === 'zh-TW' ? '返回' : 'Back'}</button>
              <button className="px-4 py-2 bg-blue-600 text-white" onClick={() => canProceedToContact() && setStep(2)} disabled={!canProceedToContact()}>
                {locale === 'de' ? 'Weiter' : locale === 'zh-TW' ? '下一步' : 'Next'}
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <div className="space-y-3">
              <input placeholder={locale === 'de' ? 'Vollständiger Name' : locale === 'zh-TW' ? '全名' : 'Full name'} className="w-full border p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input placeholder={locale === 'de' ? 'E-Mail' : locale === 'zh-TW' ? '電子郵件' : 'Email'} className="w-full border p-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder={locale === 'de' ? 'Telefon' : locale === 'zh-TW' ? '電話' : 'Phone'} className="w-full border p-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 border" onClick={() => setStep(1)}>{locale === 'de' ? 'Zurück' : locale === 'zh-TW' ? '返回' : 'Back'}</button>
              <button className="px-4 py-2 bg-blue-600 text-white" onClick={submitContact}>{locale === 'de' ? 'Weiter' : locale === 'zh-TW' ? '下一步' : 'Next'}</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <p className="mb-3 text-sm text-gray-700">{locale === 'de' ? 'Bitte wählen Sie eine Zeit im Kalender:' : locale === 'zh-TW' ? '請在日曆中選擇時間：' : 'Please pick a time in the calendar below:'}</p>

            <div className="border p-4 rounded" style={{ minHeight: 560 }}>
              <Cal namespace={namespace} calLink={calLinkForEmbed} style={{ width: '100%', height: '100%', minHeight: 520, border: 0 }} config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }} />
            </div>

            <div className="mt-3 text-sm">
              <p>{locale === 'de' ? 'Falls das Widget nicht lädt, öffnen Sie bitte die externe Buchungsseite:' : locale === 'zh-TW' ? '如果小部件無法加載，請打開外部預訂頁面：' : 'If the widget does not load, open the booking page:'}</p>
              <a className="text-blue-600" href={calFullUrlWithLocale} target="_blank" rel="noreferrer">{calFullUrlWithLocale}</a>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 border" onClick={() => setStep(2)}>{locale === 'de' ? 'Zurück' : locale === 'zh-TW' ? '返回' : 'Back'}</button>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white" onClick={() => { setStep(4) /* user confirmed booking */ }}>
                {locale === 'de' ? 'Ich habe gebucht' : locale === 'zh-TW' ? '我已預約' : "I've booked"}
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h3 className="font-semibold">{locale === 'de' ? 'Danke — Bestätigung gesendet' : locale === 'zh-TW' ? '感謝 — 已發送確認' : 'Thank you — confirmation sent'}</h3>
            <p className="mt-2 text-sm text-gray-700">
              {locale === 'de' ? `Eine Bestätigung wurde an ${form.email || 'Ihre E-Mail'} gesendet. Bitte prüfen Sie Ihren Posteingang.` : locale === 'zh-TW' ? `確認已發送至 ${form.email || '您的電子郵件'}。請檢查您的信箱。` : `A confirmation was sent to ${form.email || 'your email'}. Please check your inbox.`}
            </p>

            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white" onClick={() => { setStep(1); setAnswers({}); setForm({ name: '', email: '', phone: '' }); }}>
                {locale === 'de' ? 'Neue Buchung' : locale === 'zh-TW' ? '重新預約' : 'Make another booking'}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
