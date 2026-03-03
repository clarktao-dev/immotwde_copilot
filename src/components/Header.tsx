import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', padding: 16 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 18 }}>ImmoTWDE</Link>
        </div>

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/listings">Listings</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/news">News</Link>
          <Link href="/contact">Contact</Link>

          <div style={{ marginLeft: 12 }}>
            <Link href="/de" style={{ marginRight: 8 }}>DE</Link>
            <Link href="/zh-TW" style={{ marginRight: 8 }}>繁體</Link>
            <Link href="/en">EN</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
