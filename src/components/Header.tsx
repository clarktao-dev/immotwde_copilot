"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const supported = ['de', 'en', 'zh-TW']

export default function Header() {
  const pathname = usePathname() || '/'

  function getLocaleFromPath(path: string) {
    const parts = path.split('/').filter(Boolean)
    if (parts.length > 0 && supported.includes(parts[0])) return parts[0]
    return 'en'
  }

  function stripLocale(path: string) {
    const parts = path.split('/')
    // parts[0] is '' because path starts with '/'
    if (parts.length > 1 && supported.includes(parts[1])) {
      const rest = parts.slice(2).join('/')
      return rest ? `/${rest}` : '/'
    }
    return path || '/'
  }

  const currentLocale = getLocaleFromPath(pathname)
  const pathNoLocale = stripLocale(pathname)

  const makeLocaleLink = (locale: string, to: string) => {
    // to is the page path without locale prefix (e.g. '/about')
    if (to === '/') {
      return `/${locale}`
    }
    return `/${locale}${to}`
  }

  return (
    <header className="border-b border-gray-200 py-4">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/${currentLocale}`} className="text-lg font-bold">
            ImmoTWDE
          </Link>
        </div>

        <nav className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            {/* Listings intentionally hidden from navigation */}
            <Link href={makeLocaleLink(currentLocale, '/about')} className="text-sm hover:underline">
              About
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/services')} className="text-sm hover:underline">
              Services
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/blog')} className="text-sm hover:underline">
              Blog
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/news')} className="text-sm hover:underline">
              News
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/contact')} className="text-sm hover:underline">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            {supported.map((loc) => (
              <Link key={loc} href={makeLocaleLink(loc, pathNoLocale)} className="text-sm">
                {loc === 'de' ? 'DE' : loc === 'en' ? 'EN' : '繁體'}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
