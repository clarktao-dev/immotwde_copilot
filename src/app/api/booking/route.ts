import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(_req: NextRequest) {
  return NextResponse.json({ ok: false, error: 'moved_to_calcom' }, { status: 410 })
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'moved_to_calcom' }, { status: 410 })
}
