import Image from "next/image";

export default function Home() {
  return (
    <main style={{ padding: '24px', fontFamily: 'system-ui, Arial, sans-serif', color: '#111' }}>
      <h1 style={{ fontSize: '28px', margin: 0 }}>Welcome to ImmoTWDE</h1>
      <p style={{ marginTop: '12px' }}>A bilingual real estate platform (zh-TW / de / en).</p>

      <section style={{ marginTop: '24px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h2 style={{ fontSize: '20px', marginTop: 0 }}>Quick checks</h2>
        <ul>
          <li>No Tailwind? This page still displays via inline styles.</li>
          <li>To view in dev: run <code>npm run dev</code> and open <code>http://localhost:3000</code>.</li>
          <li>To see German page: open <code>http://localhost:3000/de</code>.</li>
        </ul>
      </section>
    </main>
  );
}
