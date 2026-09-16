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
- `/yearly-maintenance-inspection`: yearly homeowner condition-review campaign (individual request, no recurring enrollment)
- `/general-inspection`: dedicated general inspection campaign
- `/insurance-inspection`: dedicated insurance inspection campaign
- `/wind-mitigation`: dedicated wind mitigation campaign
- `/4-point-inspection`: dedicated 4-point campaign
- `/commercial-inspection`: dedicated commercial campaign
- `/progressive-inspection`: ongoing construction campaign
- `/new-construction-inspection`: final completed-home construction campaign
- `/#quote`: recommended qualifying quote path plus a collapsed, secondary callback option
- `/request-quote`: the primary conversion path; the existing six-step qualifying quote request, with pending/error handling repaired
- `/sample-report`: ungated viewer for the existing general, photo, roof, and termite sample reports
- `?sample-report=true`: preserved as a redirect to the report viewer
- `/privacy`: landing-page collection and measurement notice

The main page and its ordinary `/request-quote` entry retain the six-step qualification structure. Dedicated service pages carry an allowlisted `inspection` query through quote/report links; intent is never inherited from a prior visit.

Insurance, wind and 4-point requests use four relevant steps: contact, property, reports, dates. Wind/4-point start with the requested report selected, and users explicitly review their choices. Unrelated property-feature and general-package steps are omitted. General, commercial, completed construction and maintenance requests retain six steps, with relevant package choices. Maintenance adds homeowner priorities and concerns. The secondary callback option remains available throughout.

The service review surfaces optional age-based considerations for properties built before the existing business cutoffs: pre-1973 drain camera, pre-1978 lead assessment, and pre-1980 asbestos discussion. Valid years are required. Age is not treated as a diagnosis or an insurer requirement; recommendations never auto-select services. Lead/asbestos wording is informed by EPA guidance; the asbestos threshold is a business discussion heuristic, not a universal material cutoff. Insurance-specific requests do not display unrelated age add-ons.

Progressive construction retains its separate three-step qualified project request (contact, project, review), with required location, size, stage, scope and timing.

**Office review only:** All detailed requests now use the established contact webhook contract (`name`, `email`, `phone`, `message`, `date`, `utm_parameters`). The office message contains the full qualification, selected package, services, county, notes and preferred dates. The site no longer calls the customer quote-email webhook, includes MailerSend substitutions, calculates a customer quote or redirects to the external quote thank-you page. Completion stays on the site. The legacy pricing file is retained but is no longer part of the submission workflow.

Zapier's internal actions are external to this repository and were not inspected or changed. The owner believes its customer step is disabled; confirm that the contact workflow's recipients are office-only before relying on live delivery. No live inquiries were submitted while building.

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
- Confirmed progressive project requests emit `generate_lead` / Meta `Lead` with `lead_type: qualified_project_request`. The allowlisted `inspection_intent` distinguishes dedicated service entries; no contact or project details are passed to analytics.
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
2. On the real landing hostname, send an authorized test inquiry and confirm office/Zap delivery, office-only recipients, and the local detailed-request confirmation. No live submissions were sent during implementation.
3. In GA4 / Google Ads, confirm `generate_lead` is the chosen key event and imported conversion. Do not optimize against both it and a duplicate legacy form-submit goal.
4. Verify existing Enhanced Measurement settings and verify conversions with Tag Assistant. No Google Ads conversion ID/label was present in this repository; none was fabricated.
5. Confirm report timing and business/service copy are current before activating campaigns; pricing is confirmed by the office.
6. If phone calls will be a primary campaign goal, verify the existing call conversion / forwarding-number setup in Google Ads. This rebuild measures clicks, not call duration or qualified calls.

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
