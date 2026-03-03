type Props = { params: { locale: string } }

export default function BlogLocale({ params }: Props) {
  const locale = params.locale
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Blog ({locale})</h1>
      <p className="mt-4">Localized list of blog posts will appear here.</p>
    </main>
  )
}
