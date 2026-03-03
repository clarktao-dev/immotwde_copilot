# immotwde

ImmoTWDE — Next.js + TypeScript + Tailwind starter for a bilingual (zh-TW/de/en) real estate site with Sanity CMS, booking, and contact functionality.

## Quick start

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env.local` with required environment variables (see ENV section)

3. Run Next dev server

   ```bash
   npm run dev
   ```

## Sanity Studio

- The project includes a `sanity/` directory with a Sanity Studio scaffold. From the `sanity` directory run:

  ```bash
  npm install
  npm run start
  ```

## ENV variables (examples)

- `NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx`
- `SANITY_PROJECT_ID=your_project_id`
- `SANITY_DATASET=production`
- `SANITY_API_TOKEN=secret`
- `STRIPE_SECRET_KEY=sk_test_xxx`
- `SENDGRID_API_KEY=SG.xxx`
- `RECAPTCHA_SECRET=xxx`

## Deployment

- Recommended: Vercel. Create a project on Vercel and connect the repository. Add required ENV variables in Vercel settings.
- CI: GitHub Actions included in `.github/workflows/ci.yml` which runs lint and build on push.

## Legal pages

This repo includes placeholder templates for German legal pages (Impressum, Datenschutzerklärung, AGB, Widerrufsrecht) — update with your legal counsel.

## Contributing

- ESLint + Prettier configured. Please follow formatting rules before committing.
