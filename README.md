# Diversified campaign landing page

Vue 3 / Vite campaign site for landing.diversifiedhomeinspections.com.

## Local development

- `npm install` when dependencies are absent
- `npm run dev`
- `npm test` runs the lead/attribution regression checks without contacting live services
- `npm run build` creates the static deployment in `dist/`

## Routes and conversion flow

- `/` and `/homebuyer`: homebuyer landing page
- `/realtor`: agent-specific hero
- `/investor`: investor-specific hero
- `/insurance-inspection`: insurance-specific hero
- `/#quote`: recommended qualifying quote path plus a collapsed, secondary callback option
- `/request-quote`: the primary conversion path; the existing six-step qualifying quote request, with pending/error handling repaired
- `/sample-report`: ungated viewer for the existing general, photo, roof, and termite sample reports
- `?sample-report=true`: preserved as a redirect to the report viewer
- `/privacy`: landing-page collection and measurement notice

All primary quote calls-to-action enter the original six-step qualifying flow. Property, feature, package, service, and scheduling steps are preserved; no qualifying step is bypassed. A clearly secondary callback form is available below the recommended path for people who need help first. It does not produce an inspection quote.
Existing pricing logic in `src/utils/inspectionPriceCalculator.js` is preserved.

## Preview safety

Only the exact hostname `landing.diversifiedhomeinspections.com` enables live form delivery and production analytics.
Local and Sites previews validate the form, then show an explicitly labeled preview result.
They do not send Zapier requests, send quote email, or count conversions.
If the production hostname changes, update this allowlist in `src/utils/campaign.js` and `index.html`.

## Attribution and measurement

- All five UTMs plus gclid, gbraid, wbraid, msclkid, and fbclid are captured.
- Attribution persists for the current browser session and across internal routes; a new inbound campaign replaces the prior attribution.
- When storage is blocked, attribution survives internal navigation in memory.
- Contact details are never added to our custom analytics events.
- Production keeps GA4 `G-4SNFF2NPXN` and Meta Pixel `5092520094149116`.
- Successful detailed quote delivery emits GA `generate_lead` with `lead_type: qualified_quote`, the legacy `form_submit`, and Meta `Lead`.
- Callback delivery instead emits `callback_request` and Meta `CallbackRequest`; it never emits the qualified quote conversions.
- Buttons emit `request_quote_click`, `phone_click`, and `sample_report_click`.
- Phone-link clicks are intent signals, not confirmed calls.
- GA owns pageview tracking (initial config + account's Enhanced Measurement setting). The app does not send additional GA pageviews.
- Meta PageView is sent once per successful path change, not per same-page hash jump.
- Use `generate_lead` as the confirmed lead conversion; GA Enhanced Measurement can emit automatic `form_submit` before successful delivery.

## Deployment and indexing

Deploy the generated `dist/` to the existing static host. Preserve its SPA fallback.
`public/_redirects` supplies the Netlify/Cloudflare-style fallback.
`index.html` carries static `noindex, nofollow` directives.
`public/_headers` additionally supplies X-Robots-Tag on hosts that support that file.
Crawling is deliberately allowed in robots.txt so crawlers can read noindex.
For hosts that ignore `_headers`, set X-Robots-Tag at the host; the HTML noindex still applies.

The Sites project in `.openai/hosting.json` is a private design review, separate from the existing live hostname.
Do not publish `.env`, source credentials, or the local git history. The Maps browser key, if configured, should be restricted to authorized domains.
Maps loads only when the detailed estimate reaches its address step; manual address entry remains available.

## Before sending paid traffic

1. Review desktop and mobile in a browser, including keyboard operation, report paging, and the complete qualifying quote flow and the secondary callback option. Browser visual/interaction QA was not run during this implementation.
2. On the real landing hostname, send an authorized test inquiry and confirm office/Zap delivery, email behavior, and the production thank-you redirect for the detailed estimate. No live submissions were sent during implementation.
3. In GA4 / Google Ads, confirm `generate_lead` is the chosen key event and imported conversion. Do not optimize against both it and a duplicate legacy form-submit goal.
4. Verify existing Enhanced Measurement settings and verify conversions with Tag Assistant. No Google Ads conversion ID/label was present in this repository; none was fabricated.
5. Confirm the estimate tool's existing prices, report timing, and business/service copy are current before activating campaigns.
6. If phone calls will be a primary campaign goal, verify the existing call conversion / forwarding-number setup in Google Ads. This rebuild measures clicks, not call duration or qualified calls.

## Asset provenance

- Brand logos: existing DHI repository assets.
- Hero photo: reused from DHI's own main website, https://diversifiedhomeinspections.com/wp-content/uploads/2022/12/home-in-florida-with-pool.jpg
- Reports: existing sample-report assets.
- Testimonials: excerpts from the pre-existing SocialProof.vue content, with no invented rating or review count.
- Business facts: DHI main website and existing service content. General inspections and insurance inspection scopes are distinguished.

- Typography: self-hosted Manrope Latin variable font (400–800); SIL OFL license included in public/fonts.
