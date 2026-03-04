import { NextRequest, NextResponse } from 'next/server'

// Simple preview handler: accepts a secret and a slug, sets a preview cookie and redirects to the preview URL

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_PREVIEW_SECRET
  const body = await req.json().catch(() => ({}))
  const provided = body?.secret || req.headers.get('x-preview-secret')
  if (!secret || provided !== secret) return NextResponse.json({ ok: false, error: 'invalid_preview_secret' }, { status: 401 })

  const slug = body?.slug || body?.doc?.slug || body?.payload?.slug || null
  if (!slug) return NextResponse.json({ ok: false, error: 'missing_slug' }, { status: 400 })

  const previewUrl = `/news/${slug}`
  const res = NextResponse.json({ ok: true, previewUrl })
  // set a cookie to indicate preview mode (adjust as needed)
  res.cookies.set('preview', '1', { httpOnly: true, path: '/' })
  return res
}
