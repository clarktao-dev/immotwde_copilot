"use client"
import { useState } from 'react'

type Props = { params: { locale: string } }

type MeetingType = 'free_30' | 'personal_60' | 'onsite'

interface BookingForm {
  name?: string
  email?: string
  phone?: string
  personal?: string
  address?: string
  message?: string
  slot?: string
}

export default function Booking({ params }: Props) {
  const locale = params.locale || 'en'
  const [step, setStep] = useState(1)
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null)
  const [form, setForm] = useState<BookingForm>({})
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  const titles: Record<string, string> = {
    en: 'Booking',
    de: 'Buchen',
    'zh-TW': '預約',
  }

  async function fetchSlots() {
    // Placeholder: integrate Google Calendar availability API or backend endpoint
    setAvailableSlots(['2026-03-10T10:00:00Z', '2026-03-10T11:00:00Z', '2026-03-11T14:00:00Z'])
  }

  function next() {
    if (step === 1 && meetingType) setStep(2)
    else if (step === 2) {
      // validate contact info
      setStep(3)
      fetchSlots()
    } else if (step === 3) {
      setStep(4)
    }
  }

  function prev() {
    setStep((s) => Math.max(1, s - 1))
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{titles[locale] ?? titles.en}</h1>

      <div className="mt-4 max-w-xl">
        {step === 1 && (
          <section>
            <h2 className="font-semibold">Select meeting type</h2>
            <div className="mt-2 space-y-2">
              <label className="block">
                <input type="radio" name="type" onChange={() => setMeetingType('free_30')} /> Free consult — 30 min
              </label>
              <label className="block">
                <input type="radio" name="type" onChange={() => setMeetingType('personal_60')} /> 1-1 Personal Meeting — 1 hr
              </label>
              <label className="block">
                <input type="radio" name="type" onChange={() => setMeetingType('onsite')} /> On-Site Meeting
              </label>
            </div>
            <div className="mt-4">
              <button onClick={next} className="px-4 py-2 bg-blue-600 text-white" disabled={!meetingType}>
                Next
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="font-semibold">Your details</h2>
            <div className="mt-2 space-y-2">
              <input placeholder="Full name" className="w-full border p-2" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Email" className="w-full border p-2" value={form.email ?? ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Phone" className="w-full border p-2" value={form.phone ?? ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              {meetingType === 'personal_60' && (
                <input placeholder="Personal details" className="w-full border p-2" value={form.personal ?? ''} onChange={(e) => setForm({ ...form, personal: e.target.value })} />
              )}
              {meetingType === 'onsite' && (
                <input placeholder="Address for on-site" className="w-full border p-2" value={form.address ?? ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              )}

              <textarea placeholder="What would you like to discuss?" className="w-full border p-2" value={form.message ?? ''} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={prev} className="px-4 py-2 border">Back</button>
              <button onClick={next} className="px-4 py-2 bg-blue-600 text-white">Next: Choose time</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="font-semibold">Choose a time slot</h2>
            <div className="mt-2">
              <button onClick={() => fetchSlots()} className="px-3 py-2 border">Load available slots</button>
              <ul className="mt-2 space-y-2">
                {availableSlots.map((s) => (
                  <li key={s}>
                    <label>
                      <input type="radio" name="slot" onChange={() => setForm({ ...form, slot: s })} /> {new Date(s).toLocaleString()}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={prev} className="px-4 py-2 border">Back</button>
              <button onClick={next} className="px-4 py-2 bg-blue-600 text-white">Confirm & Send Invitation</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="font-semibold">Confirmation</h2>
            <p className="mt-2">Thank you — a calendar invite will be sent to {form.email} (placeholder).</p>
          </section>
        )}
      </div>
    </main>
  )
}
