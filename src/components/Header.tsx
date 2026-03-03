"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const supported = ['de', 'en', 'zh-TW']

const navTranslations: Record<string, { title: string; about: string; services: string; blog: string; news: string; contact: string }> = {
  en: { title: 'ImmoTWDE', about: 'About', services: 'Services', blog: 'Blog', news: 'News', contact: 'Contact' },
  de: { title: 'ImmoTWDE', about: 'Über uns', services: 'Dienstleistungen', blog: 'Blog', news: 'Neuigkeiten', contact: 'Kontakt' },
  'zh-TW': { title: 'ImmoTWDE', about: '關於我們', services: '服務項目', blog: '部落格', news: '新聞', contact: '聯絡我們' },
}

export default function Header() {
  const pathname = usePathname() || '/'
  const router = useRouter()

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
  const t = navTranslations[currentLocale] ?? navTranslations.en

  const makeLocaleLink = (locale: string, to: string) => {
    // to is the page path without locale prefix (e.g. '/about')
    if (to === '/') {
      return `/${locale}`
    }
    return `/${locale}${to}`
  }

  function onChangeLocale(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value
    const target = makeLocaleLink(newLocale, pathNoLocale)
    router.push(target)
  }

  return (
    <header className="border-b border-gray-200 py-4">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/${currentLocale}`} className="text-lg font-bold">
            {t.title}
          </Link>
        </div>

        <nav className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <Link href={makeLocaleLink(currentLocale, '/about')} className="text-sm hover:underline">
              {t.about}
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/services')} className="text-sm hover:underline">
              {t.services}
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/blog')} className="text-sm hover:underline">
              {t.blog}
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/news')} className="text-sm hover:underline">
              {t.news}
            </Link>
            <Link href={makeLocaleLink(currentLocale, '/contact')} className="text-sm hover:underline">
              {t.contact}
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <label htmlFor="locale-select" className="sr-only">Select language</label>
            <select id="locale-select" value={currentLocale} onChange={onChangeLocale} className="border p-1 text-sm">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="zh-TW">繁體</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  )
}
