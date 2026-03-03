"use client"
import { useState } from 'react'

export default function BookingForm({ params }: { params: { slug: string } }) {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const form = e.target as HTMLFormElement
    const fd = new FormData(form)
    const payload: Record<string, unknown> = {}
    fd.forEach((v,k)=>payload[k as string]=v)

    try{
      const res = await fetch('/api/booking', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if(res.ok && (data as any).ok){ setStatus('success'); form.reset() } else { setStatus('error'); setError((data as any).error) }
    }catch(err: unknown){ setStatus('error'); setError(err instanceof Error ? err.message : String(err)) }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Request Booking</h1>
      <form onSubmit={submit}>
        <input type="hidden" name="listingId" value={params.slug} />
        <div style={{ marginTop:12 }}><label>Name: <input name="name" required /></label></div>
        <div style={{ marginTop:12 }}><label>Email: <input name="email" type="email" required /></label></div>
        <div style={{ marginTop:12 }}><label>Start: <input name="startDate" type="date" required /></label></div>
        <div style={{ marginTop:12 }}><label>End: <input name="endDate" type="date" required /></label></div>
        <div style={{ marginTop:12 }}><button type="submit" disabled={status==='sending'}>{status==='sending'?'Sending...':'Request'}</button></div>
      </form>

      {status==='success' && <p style={{color:'green'}}>Booking created.</p>}
      {status==='error' && <p style={{color:'red'}}>Error: {error}</p>}
    </main>
  )
}
