<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This repository contains the ImmoTWDE Next.js website.

Guidance for Copilot:
- Follow the project's coding conventions (TypeScript, Tailwind, Next.js App Router).
- All content is multi-lingual: zh-TW, de, en. Use i18n routing and localized metadata.
- Use Sanity as the headless CMS for content types: Listing, BlogPost, NewsArticle, Booking, LegalPage, SiteSettings.
- For booking flow, store bookings in Sanity and integrate Stripe for payments (optional).
- Ensure components are accessible (WCAG) and SEO-friendly (head meta tags, Open Graph).
- Legal pages required by German law must be present with proper titles and placeholders.
