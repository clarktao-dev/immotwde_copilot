import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { amount, currency = 'eur', paymentMethod = 'stripe' } = data

  if (paymentMethod === 'stripe') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: { enabled: true },
      })
      return NextResponse.json({ ok: true, clientSecret: paymentIntent.client_secret })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ ok: false, error: 'stripe_error' }, { status: 500 })
    }
  }

  if (paymentMethod === 'paypal') {
    // For PayPal, return an instruction for client to create an order via PayPal SDK
    return NextResponse.json({ ok: true, provider: 'paypal', instruction: 'Create an order using PayPal JS SDK on the client.' })
  }

  if (paymentMethod === 'bank_transfer') {
    // Return bank details (example IBAN for placeholder)
    return NextResponse.json({
      ok: true,
      provider: 'bank_transfer',
      bankDetails: {
        accountName: 'ImmoTWDE GmbH',
        iban: process.env.BANK_IBAN || 'DE00 0000 0000 0000 0000 00',
        bic: process.env.BANK_BIC || 'DEUTDEFF',
        bankName: process.env.BANK_NAME || 'Example Bank',
        reference: 'Booking #<id>'
      }
    })
  }

  return NextResponse.json({ ok: false, error: 'invalid_method' }, { status: 400 })
}
