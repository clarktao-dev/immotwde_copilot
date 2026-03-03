import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanityClient'

type SanityCreateResult = { _id: string }
type SanityClientLike = { create?: (doc: unknown) => Promise<SanityCreateResult> }

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

    const client = sanityClient as SanityClientLike

    if (typeof client.create !== 'function') {
      throw new Error('Sanity client not configured')
    }

    const result = await client.create(doc)

    return NextResponse.json({ ok: true, bookingId: result._id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: 'Failed to save booking' }, { status: 500 })
  }
}
