const fs = require('fs')

const pages = ['/', '/legal/impressum', '/legal/datenschutz', '/legal/agb', '/legal/widerruf']

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>\n    <loc>https://example.com${p}</loc>\n  </url>`
  )
  .join('\n')}
</urlset>`

fs.writeFileSync('public/sitemap.xml', xml)
console.log('sitemap written to public/sitemap.xml')
