import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', padding: 16 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/">
            <a style={{ fontWeight: 700, fontSize: 18 }}>ImmoTWDE</a>
          </Link>
        </div>

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/listings"><a>Listings</a></Link>
          <Link href="/blog"><a>Blog</a></Link>
          <Link href="/news"><a>News</a></Link>
          <Link href="/contact"><a>Contact</a></Link>

          <div style={{ marginLeft: 12 }}>
            <Link href="/de"><a style={{ marginRight: 8 }}>DE</a></Link>
            <Link href="/zh-TW"><a style={{ marginRight: 8 }}>繁體</a></Link>
            <Link href="/en"><a>EN</a></Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
