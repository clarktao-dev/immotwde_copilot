import Link from 'next/link'

type Props = { params: { locale: string } }
const supported = ['de', 'en', 'zh-TW']

export default function LocaleHome({ params }: Props) {
  const { locale } = params
  if (!supported.includes(locale)) return <div>Locale not supported</div>
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Home ({locale})</h1>
      <nav className="mt-4 space-x-4">
        <Link href={`/${locale}/about`}>About</Link>
        <Link href={`/${locale}/services`}>Services</Link>
        <Link href={`/${locale}/blog`}>Blog</Link>
        <Link href={`/${locale}/news`}>News</Link>
        <Link href={`/${locale}/contact`}>Contact</Link>
      </nav>
    </div>
  )
}
