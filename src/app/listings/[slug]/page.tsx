import MapboxMap from '@/components/MapboxMap'

export default function ListingDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug
  // placeholder content
  const listing = {
    title: slug === 'cozy-2br-taipei' ? 'Cozy 2BR in Taipei' : 'Modern apartment in Berlin',
    price: slug === 'cozy-2br-taipei' ? '€120,000' : '€320,000',
    description: 'Sample description. Replace with Sanity content.'
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{listing.title}</h1>
      <div style={{ color: '#6b7280', marginTop: 8 }}>{listing.price}</div>
      <div style={{ marginTop: 16 }}>{listing.description}</div>
      <div style={{ marginTop: 16 }}>
        <MapboxMap />
      </div>

      <section style={{ marginTop: 24 }}>
        <h2>Booking</h2>
        <form action="/api/booking" method="post">
          <input name="listingId" type="hidden" value="placeholder" />
          <div style={{ marginTop: 8 }}>
            <label>Name: <input name="name" /></label>
          </div>
          <div style={{ marginTop: 8 }}>
            <label>Email: <input name="email" /></label>
          </div>
          <div style={{ marginTop: 12 }}>
            <button type="submit">Request Booking</button>
          </div>
        </form>
      </section>
    </main>
  )
}
