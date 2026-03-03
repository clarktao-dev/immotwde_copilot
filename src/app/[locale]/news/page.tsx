type Props = { params: { locale: string } }

export default function NewsLocale({ params }: Props) {
  const locale = params.locale
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">News ({locale})</h1>
      <p className="mt-4">Localized news articles will appear here.</p>
    </main>
  )
}
