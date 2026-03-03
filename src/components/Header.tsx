import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-bold">ImmoTWDE</Link>
        </div>

        <nav className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            {/* Listings intentionally hidden from navigation */}
            <Link href="/about" className="text-sm hover:underline">About</Link>
            <Link href="/services" className="text-sm hover:underline">Services</Link>
            <Link href="/blog" className="text-sm hover:underline">Blog</Link>
            <Link href="/news" className="text-sm hover:underline">News</Link>
            <Link href="/contact" className="text-sm hover:underline">Contact</Link>
          </div>

          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <Link href="/de" className="text-sm">DE</Link>
            <Link href="/zh-TW" className="text-sm">繁體</Link>
            <Link href="/en" className="text-sm">EN</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
