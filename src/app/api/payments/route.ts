import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import fetch from 'node-fetch'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { amount, currency = 'eur', paymentMethod = 'stripe', description = 'Booking', bookingId } = body

  if (!amount) {
    return NextResponse.json({ ok: false, error: 'missing_amount' }, { status: 400 })
  }

  try {
    if (paymentMethod === 'stripe') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: typeof amount === 'string' ? parseInt(amount, 10) : amount,
        currency,
        description,
        metadata: { bookingId: bookingId || '' },
        automatic_payment_methods: { enabled: true },
      })

      return NextResponse.json({ ok: true, provider: 'stripe', clientSecret: paymentIntent.client_secret })
    }

    if (paymentMethod === 'paypal') {
      const clientId = process.env.PAYPAL_CLIENT_ID || ''
      const secret = process.env.PAYPAL_SECRET || ''
      if (!clientId || !secret) {
        return NextResponse.json({ ok: false, error: 'paypal_not_configured' }, { status: 500 })
      }

      // Get PayPal access token (sandbox)
      const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${clientId}:${secret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      })

      const tokenData = await tokenRes.json()
      if (!tokenData.access_token) {
        return NextResponse.json({ ok: false, error: 'paypal_token_failed', details: tokenData }, { status: 500 })
      }

      // Create an order
      const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{ amount: { currency_code: currency.toUpperCase(), value: (Number(amount) / 100).toFixed(2) }, description }],
          application_context: { return_url: process.env.PAYPAL_RETURN_URL || 'https://example.com/paypal/return', cancel_url: process.env.PAYPAL_CANCEL_URL || 'https://example.com/paypal/cancel' },
        }),
      })

      const orderData = await orderRes.json()
      const approveLink = (orderData.links || []).find((l: any) => l.rel === 'approve')
      return NextResponse.json({ ok: true, provider: 'paypal', order: orderData, approveUrl: approveLink?.href })
    }

    if (paymentMethod === 'bank_transfer') {
      return NextResponse.json({
        ok: true,
        provider: 'bank_transfer',
        bankDetails: {
          accountName: process.env.BANK_ACCOUNT_NAME || 'ImmoTWDE GmbH',
          iban: process.env.BANK_IBAN || 'DE00 0000 0000 0000 0000 00',
          bic: process.env.BANK_BIC || 'DEUTDEFF',
          bankName: process.env.BANK_NAME || 'Example Bank',
          reference: bookingId ? `Booking ${bookingId}` : 'Booking reference',
        },
      })
    }

    return NextResponse.json({ ok: false, error: 'invalid_method' }, { status: 400 })
  } catch (err: any) {
    console.error('payments error', err)
    return NextResponse.json({ ok: false, error: 'server_error', details: err.message || err }, { status: 500 })
  }
}
