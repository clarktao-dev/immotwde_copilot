import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: 24, marginTop: 48 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <strong>ImmoTWDE</strong>
          <div style={{ marginTop: 8 }}>
            <Link href="/legal/impressum">Impressum</Link> · <Link href="/legal/datenschutz">Datenschutz</Link> · <Link href="/legal/agb">AGB</Link> · <Link href="/legal/widerruf">Widerruf</Link>
          </div>
        </div>
        <div>
          <div>Contact: <a href="mailto:you@example.com">you@example.com</a></div>
        </div>
      </div>
    </footer>
  )
}
