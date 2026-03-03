"use client"
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, unknown> = {}
    formData.forEach((v, k) => (payload[k] = v))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && (data as any).ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setError((data as any).error || 'Submission failed')
      }
    } catch (err: unknown) {
      setStatus('error')
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 12 }}>
          <label>Name: <input name="name" required /></label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Email: <input name="email" type="email" required /></label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Message: <textarea name="message" required /></label>
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send'}</button>
        </div>
      </form>

      {status === 'success' && <p style={{ color: 'green', marginTop: 12 }}>Message sent successfully.</p>}
      {status === 'error' && <p style={{ color: 'red', marginTop: 12 }}>Error: {error}</p>}
    </main>
  )
}
