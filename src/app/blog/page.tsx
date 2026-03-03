export default function BlogList() {
  const posts = [
    { id: '1', title: 'Welcome to ImmoTWDE', slug: 'welcome' }
  ]

  return (
    <main style={{ padding: 24 }}>
      <h1>Blog</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}><a href={`/blog/${p.slug}`}>{p.title}</a></li>
        ))}
      </ul>
    </main>
  )
}
