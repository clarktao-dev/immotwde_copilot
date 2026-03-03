import Link from 'next/link'

export default function Listings() {
  // placeholder data
  const items = [
    { id: '1', title: 'Cozy 2BR in Taipei', price: '€120,000', slug: 'cozy-2br-taipei' },
    { id: '2', title: 'Modern apartment in Berlin', price: '€320,000', slug: 'modern-berlin' }
  ]

  return (
    <main style={{ padding: 24 }}>
      <h1>Listings</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 16 }}>
        {items.map(item => (
          <article key={item.id} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
            <h2 style={{ margin: 0 }}>{item.title}</h2>
            <div style={{ color: '#6b7280', marginTop: 8 }}>{item.price}</div>
            <div style={{ marginTop: 12 }}>
              <Link href={`/listings/${item.slug}`}><a>View</a></Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
