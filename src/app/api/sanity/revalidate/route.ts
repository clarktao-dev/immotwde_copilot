import { NextRequest, NextResponse } from 'next/server'

// Sanity webhook revalidate route
// - Validates x-webhook-secret header or payload.secret against SANITY_WEBHOOK_SECRET
// - Triggers a deploy hook (DEPLOY_HOOK_URL) if configured, otherwise responds with the paths to revalidate

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET
  const header = req.headers.get('x-webhook-secret') || req.headers.get('x-sanity-webhook')

  let body: any = {}
  try {
    body = await req.json()
  } catch (e) {
    // ignore
  }

  const provided = header || body.secret
  if (secret && provided !== secret) {
    return NextResponse.json({ ok: false, error: 'invalid_secret' }, { status: 401 })
  }

  // Determine candidate paths to revalidate
  const paths = ['/', '/news', '/blog']

  // If payload includes a document slug/property, try to add its page path
  const doc = body?.document || body?.doc || body?.payload || body
  try {
    const slug = doc?.slug || doc?.fields?.slug || doc?.data?.slug || doc?.payload?.slug
    const category = (doc?.category || doc?.fields?.category || doc?.data?.category || doc?.payload?.category) || null
    if (slug && typeof slug === 'string') {
      const clean = slug.replace(/^\//, '')
      const base = String(category)?.toLowerCase()?.includes('blog') ? '/blog' : '/news'
      paths.push(`${base}/${clean}`)
    }
  } catch (e) {
    // ignore parsing issues
  }

  // If a deploy hook URL is configured, trigger it (useful on Vercel/Netlify)
  const deployHook = process.env.DEPLOY_HOOK_URL
  if (deployHook) {
    try {
      await fetch(deployHook, { method: 'POST' })
      return NextResponse.json({ ok: true, triggered: true, paths })
    } catch (e) {
      console.error('deploy hook failed', e)
      return NextResponse.json({ ok: false, error: 'deploy_failed', paths }, { status: 500 })
    }
  }

  // Otherwise return paths for manual revalidation handling
  return NextResponse.json({ ok: true, triggered: false, paths })
}
