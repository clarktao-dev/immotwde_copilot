import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { name, email, message } = data

  // TODO: implement email sending with SendGrid/Nodemailer and reCAPTCHA verification

  if (!email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }

  // For now, just return success
  return NextResponse.json({ ok: true })
}
