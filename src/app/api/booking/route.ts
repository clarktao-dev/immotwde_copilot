import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { listingId, name, email, phone, startDate, endDate } = data

  if (!listingId || !name || !email || !startDate || !endDate) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }

  try {
    const doc = {
      _type: 'booking',
      listing: { _type: 'reference', _ref: listingId },
      name,
      email,
      phone,
      startDate,
      endDate,
      status: 'pending',
    }

    const result =
      typeof (sanityClient as any)?.create === 'function'
        ? await (sanityClient as any).create(doc)
        : (() => {
            throw new Error('Sanity client not configured')
          })()

    return NextResponse.json({ ok: true, bookingId: result._id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: 'Failed to save booking' }, { status: 500 })
  }
}
