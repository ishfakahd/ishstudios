# Ish Studios — Website v2

Premium, responsive portfolio and enquiry website built with static HTML, CSS and JavaScript. No build step or package installation is required.

## Run locally
Open `index.html` in a browser or serve this folder with a static web server.

## Pages
- `index.html` — studio home, services overview, filterable portfolio, founder profile, Instagram showcase and enquiry form.
- `services.html` — service directions and quote-based package outlines.
- `case-studies/sevena-villa.html`
- `case-studies/ish-studios.html`
- `case-studies/social-content.html`
- `case-studies/dr-rap.html`

## Features
- Premium dark and light themes with saved visitor preference (`localStorage`); first visit follows system theme.
- Responsive sticky navigation and mobile menu.
- Founder section using the supplied portrait at `assets/founder-portrait.jpg`.
- Individual case-study pages with explicit notes where project evidence still needs confirmation.
- Instagram showcase linking to the Ish Studios profile.
- Services and quote-based package page (no invented fixed prices).
- Project enquiry form that opens WhatsApp Business with the visitor's message prefilled.
- Animated loading screen, scroll reveals and reduced-motion support.
- SEO descriptions, Open Graph and Twitter metadata on all pages.
- Analytics event hooks: `page_view`, `outbound_click`, `theme_change`, `cta_click`, and `generate_lead` are pushed to `window.dataLayer`. No personal form field values are sent to analytics.

## Analytics setup (required before live measurement)
The website is prepared for Google Tag Manager / GA4 event tracking, but no analytics property or Measurement ID was supplied. To collect analytics, create or use your own GA4 property and add its Google tag or GTM container snippet to each HTML page. Map the existing `dataLayer` events to GA4 events. Do not publish a guessed Measurement ID. Enquiry tracking records the selected service and budget category only; it deliberately excludes the person's name, phone number and project brief.

## Contact
- WhatsApp Business: https://wa.me/94719566533
- Instagram: https://www.instagram.com/ishhstudios/
- Facebook: https://web.facebook.com/profile.php?id=61591106524365

## Before public launch — real assets and confirmations needed
1. Replace the founder portrait with a clean, high-resolution original without the event photographer's footer/watermark, if available.
2. Sevena Villa: add approved desktop/mobile website screenshots, original villa photography and booking workflow screenshots (with client permission).
3. Ish Studios: add final logo/brand system and real design exports.
4. Social/content: replace illustrative CSS tiles with approved post designs, reel covers, photography and video stills.
5. DR-RAP: confirm project status, exact role, technology stack and deliverables; add genuine app screenshots or a demo before presenting it as completed work.
6. Add real client testimonials only after receiving permission.
7. Provide the public business email if you want it displayed.
8. Add the GA4 Measurement ID or GTM container snippet to activate external analytics collection.
9. Add the final production domain to canonical URLs and sitemap once confirmed.

## Deployment to Netlify
For a Git-based deployment, publish the `ish-studios` folder with no build command and `.` as the publish directory. Keep all paths and folders intact.


## Brand mark update
- `assets/logo.png` and `assets/ish-symbol.png` now contain the standalone white-to-violet Ish symbol, extracted from the supplied gold logo artwork (wordmark/tagline excluded).
- Browser tab icons are supplied as `assets/favicon.ico`, PNG sizes, and Apple touch icon; all pages reference the correct relative paths.
