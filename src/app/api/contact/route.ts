import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET || ''
  if (!secret) return false
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
    method: 'POST',
  })
  type RecaptchaResponse = { success?: boolean }
  const data = (await res.json()) as RecaptchaResponse
  return !!data.success
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { name, email, message, token } = data

  if (!email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }

  const verified = await verifyRecaptcha(token)
  if (!verified) {
    return NextResponse.json({ ok: false, error: 'recaptcha_failed' }, { status: 400 })
  }

  try {
    await sendgrid.send({
      to: process.env.CONTACT_EMAIL || '',
      from: process.env.SENDGRID_FROM || process.env.CONTACT_EMAIL || '',
      subject: `Contact from ${name} <${email}>`,
      text: message,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
  }
}
