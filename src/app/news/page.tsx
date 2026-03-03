export default function NewsList() {
  const items = [ { id: '1', title: 'Site launched', slug: 'site-launched' } ]
  return (
    <main style={{ padding: 24 }}>
      <h1>News</h1>
      <ul>
        {items.map(i => <li key={i.id}><a href={`/news/${i.slug}`}>{i.title}</a></li>)}
      </ul>
    </main>
  )
}
