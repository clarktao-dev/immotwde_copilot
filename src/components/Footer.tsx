export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: 24, marginTop: 48 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <strong>ImmoTWDE</strong>
          <div style={{ marginTop: 8 }}>
            <a href="/legal/impressum">Impressum</a> · <a href="/legal/datenschutz">Datenschutz</a> · <a href="/legal/agb">AGB</a> · <a href="/legal/widerruf">Widerruf</a>
          </div>
        </div>
        <div>
          <div>Contact: <a href="mailto:you@example.com">you@example.com</a></div>
        </div>
      </div>
    </footer>
  )
}
