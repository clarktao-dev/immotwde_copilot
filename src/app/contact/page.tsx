export default function ContactPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Contact</h1>
      <form onSubmit={(e) => { e.preventDefault(); alert('Submit handled in client later') }}>
        <div style={{ marginTop: 12 }}>
          <label>Name: <input name="name" /></label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Email: <input name="email" /></label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Message: <textarea name="message" /></label>
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Send</button>
        </div>
      </form>
    </main>
  )
}
