# Diversified campaign landing page

Vue 3 / Vite campaign site for landing.diversifiedhomeinspections.com.

## Local development

- `npm install` when dependencies are absent
- `npm run dev`
- `npm test` checks external request links, retired-route redirects, absence of local forms, attribution and analytics isolation
- `npm run build` regenerates the checked-in static deployment in `dist/`

## Request flow

Every quote/request navigation button uses `https://diversifiedhomeinspections.com/landing/inspection-request/general`, in the same tab. The destination is centralized in `src/utils/inspectionIntent.js`.

The old `/request-quote` route (including service-query variants and a trailing slash) replaces the current browser location with that external destination. A direct link remains visible if navigation cannot complete. `location.replace` prevents the redirect page from trapping visitors in a back-button loop.

Local detailed quote, progressive project, callback and sample-report request forms have been removed, together with their webhook senders, payload builders, validation/pricing helpers and obsolete form-bearing legacy views. The former callback sections now contain request and phone links. There is no Zapier connection or form submission in this application. External website forms and Zapier account workflows were not changed.

## Routes

- `/`, `/homebuyer`, `/realtor`, `/investor`: audience landing pages
- `/yearly-maintenance-inspection`, `/general-inspection`, `/insurance-inspection`, `/wind-mitigation`, `/4-point-inspection`, `/commercial-inspection`, `/progressive-inspection`, `/new-construction-inspection`: service pages
- `/#quote`: external-request and telephone links
- `/request-quote`: external request redirect
- `/sample-report`: ungated sample report viewer; existing `?sample-report=true` links redirect here, except the retired quote route always goes to the external form
- `/privacy`: landing-page measurement notice

## Attribution and measurement

- Only the exact hostname `landing.diversifiedhomeinspections.com` enables live analytics. Local/preview pages do not emit production events; their ordinary external links still navigate to the main website.
- Production keeps GA4 `G-4SNFF2NPXN` and Meta Pixel `5092520094149116`.
- GA owns pageviews through initial config and the account's Enhanced Measurement history setting; the application sends no manual GA pageviews.
- Meta PageView is sent once per successful path change, excluding duplicate/failed and query/hash-only navigation.
- Instrumented links send GA `request_quote_click`, `phone_click`, `sample_report_click`; report-group controls send `sample_report_section`.
- This project no longer emits form-start, form-submit, lead or callback-conversion events. Request-link clicks are not completed leads; telephone-link clicks are not verified calls.
- Five UTMs plus gclid, gbraid, wbraid, msclkid and fbclid remain captured for the browser session. New inbound campaign parameters replace the previous set, with an in-memory fallback when storage is blocked.
- External links use the fixed destination; explicit parameter forwarding was not added. Confirm session/attribution continuity on the main website before relying on combined funnel reporting.
- Successful lead measurement must be owned by the main website's actual submission-completion implementation. Review GA4 key events, Meta rules and imported Ads goals there; do not promote landing-page clicks into lead conversions.

See `ANALYTICS_AUDIT.md` for current tracking responsibilities and remaining external checks.

## Deployment and indexing

Build `dist/` and deploy it only with separate authorization. No deployment was performed during cleanup. Ensure the host replaces obsolete assets rather than retaining the former local-form bundles.

Preserve the existing SPA fallback from `public/_redirects`, the static noindex/nofollow directives in `index.html`, and X-Robots-Tag from `public/_headers` on hosts that support it. Crawling remains allowed so crawlers can read noindex. The retired quote route redirects in the application on any host serving the SPA fallback.

The Sites project in `.openai/hosting.json` is a private design review, separate from the live hostname. Do not publish `.env`, source credentials or local git history. No Maps key or other environment variable is required by the current application.

## Asset provenance

- Brand logos: existing DHI repository assets.
- Hero photo: reused from DHI's own main website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/home-in-florida-with-pool.jpg
- Commercial photo: DHI website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/DJI_0133-scaled.jpg
- Progressive construction photo: DHI website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/new-construction.jpg
- Roof aerial: DHI website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/DJI_0031-scaled.jpg
- Completed home: DHI website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/Residential-and-Comemrcial-Inspections-Homepage-Hero.jpg
- Team: DHI website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/team-one-inspector.jpg
- Maintenance service background: https://diversifiedhomeinspections.com/the-importance-of-regular-home-inspections-for-property-maintenance/ (supports periodic condition reviews; the yearly campaign is requested by the owner, not a claimed legal requirement)
- Lead guidance: https://www.epa.gov/lead/reduce-risk-lead-exposure-home
- Asbestos guidance: https://www.epa.gov/asbestos/protect-your-family-exposures-asbestos
- Reports: existing sample-report assets.
- Testimonials: excerpts from the pre-existing SocialProof.vue content, with no invented rating or review count.
- Business facts: DHI main website and existing service content. General inspections and insurance inspection scopes are distinguished.

- Typography: self-hosted Manrope Latin variable font (400–800); SIL OFL license included in public/fonts.
