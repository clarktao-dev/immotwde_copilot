import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import crypto from 'crypto'

// Cal.com webhook handler: POST payloads for new bookings
// This route writes booking rows to Google Sheets using ADC (Workload Identity Federation).
// If CALCOM_WEBHOOK_SECRET is set, the handler will validate the HMAC-SHA256 signature
// sent by Cal.com. The header name may be `cal-signature` or `x-cal-signature`.

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text()

    const secret = process.env.CALCOM_WEBHOOK_SECRET
    if (secret) {
      const header = (req.headers.get('cal-signature') || req.headers.get('x-cal-signature') || '')
      if (!header) {
        console.error('missing cal signature header')
        return NextResponse.json({ ok: false, error: 'missing_signature' }, { status: 401 })
      }

      // Header formats may vary; support "sha256=..." or raw hex
      const sigParts = header.split('=')
      const receivedSig = sigParts.length > 1 ? sigParts[sigParts.length - 1] : sigParts[0]

      const hmac = crypto.createHmac('sha256', secret).update(raw).digest('hex')

      // timing-safe compare
      const a = Buffer.from(hmac, 'hex')
      let b: Buffer
      try {
        b = Buffer.from(receivedSig, 'hex')
      } catch (e) {
        // received signature is not hex; fall back to utf8 compare
        b = Buffer.from(receivedSig, 'utf8')
      }

      if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        console.error('invalid cal signature', { expected: hmac, received: receivedSig })
        return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 401 })
      }
    }

    const body = raw ? JSON.parse(raw) : {}
    const { event, payload } = body

    if (event !== 'booking.created' && event !== 'booking.rescheduled') {
      return NextResponse.json({ ok: true, ignored: true })
    }

    const booking = payload || {}
    const start = booking.start_time || booking.start || ''
    const end = booking.end_time || booking.end || ''
    const name = booking.name || booking.title || booking.customer?.name || booking.customer?.firstName || ''
    const email = booking.email || booking.customer?.email || booking.customer?.contact?.email || ''
    const notes = booking.notes || booking.description || ''

    // Prepare row values
    const row = [new Date().toISOString(), name, email, start, end, notes]

    // Append to Google Sheet
    const auth = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
    const client = (await auth.getClient()) as any
    const sheets = google.sheets({ version: 'v4', auth: client })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID || '',
      range: 'Bookings!A:F',
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('calcom webhook error', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
