"use client"
import React, { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

type Props = { params: { locale: string } }

export default function Booking({ params }: Props) {
  const locale = params.locale || 'en'

  const titles: Record<string, string> = {
    en: 'Booking',
    de: 'Buchen',
    'zh-TW': '預約',
  }

  // Configure these values for your Cal.com setup
  const namespace = '15min' // change if your Cal.com namespace is different
  // calLinkPath is the value the <Cal /> component expects (username/event)
  const calLinkPath: Record<string, string> = {
    en: 'immotwde/15min',
    de: 'immotwde/15min',
    'zh-TW': 'immotwde/15min',
  }

  // full public URLs used for fallback/open-in-new-tab (recommended)
  const calFullUrl: Record<string, string> = {
    en: 'https://cal.com/immotwde/15min',
    de: 'https://cal.com/immotwde/15min',
    'zh-TW': 'https://cal.com/immotwde/15min',
  }

  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({ namespace })
        // Configure the UI; keep only known properties to satisfy types
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      } catch (e) {
        // ignore init errors in dev
        console.warn('cal init failed', e)
      }
    })()
  }, [locale])

  // Prepare values
  const calLinkForEmbed = calLinkPath[locale] ?? calLinkPath.en
  const calFullUrlWithLocale = `${calFullUrl[locale] ?? calFullUrl.en}?locale=${encodeURIComponent(locale)}`

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{titles[locale] ?? titles.en}</h1>

      <div className="mt-4 max-w-full">
        {/*
          Cal.com React embed. If you later want to replace with raw iframe or the script widget,
          replace the <Cal /> element below with your snippet.
        */}

        <div className="border p-4 rounded" style={{ minHeight: 600 }}>
          <Cal
            namespace={namespace}
            // calLink expects the "username/event" path (without protocol) per the embed API
            calLink={calLinkForEmbed}
            style={{ width: '100%', height: '100%', minHeight: 600, border: 0 }}
            config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
          />

          {/* Fallback: open full Cal.com page (useful on localhost or if embed 404s) */}
          <div className="mt-4 text-sm">
            <p>If the embedded scheduler returns an error, open the booking page directly:</p>
            <a className="text-blue-600" href={calFullUrlWithLocale} target="_blank" rel="noreferrer">Open booking page on Cal.com</a>
          </div>
        </div>
      </div>
    </main>
  )
}
