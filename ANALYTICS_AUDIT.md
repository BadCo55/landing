# Analytics integrity after local-form cleanup

Updated September 22, 2026 following the authorized cleanup. This report supersedes the earlier audit of the local forms.

## Request ownership

All active quote-request navigation buttons point to `https://diversifiedhomeinspections.com/landing/inspection-request/general`. `/request-quote` now automatically redirects there with `location.replace`, with a direct-link fallback. Query variants cannot expose the removed forms. Former callback sections offer the external request link and a telephone link.

Local detailed quote, progressive project, callback and gated sample-report forms, their webhook senders and form-specific helpers have been removed. Obsolete legacy views/components that referenced the old forms or local quote buttons were also removed. No Zapier endpoints remain in source or regenerated deployment assets. The previous detailed-form submission guard was superseded by removal of the form itself.

This changes only this landing project. The external request form and Zapier account workflows were not inspected, disabled or modified. No production forms were submitted and nothing was deployed.

## Tracking architecture

- GA4 `G-4SNFF2NPXN`: one production-only initialization and one gtag.js loader in `index.html`.
- No GTM container, second GA4 initializer or Google Ads tag is implemented here. The googletagmanager.com loader serves gtag.js, not a GTM container.
- Initial GA pageview remains owned by config; SPA views depend on account-controlled Enhanced Measurement history settings. No manual application GA pageviews were added.
- Meta `5092520094149116`: one production-only initialization. The router owns initial and subsequent successful path PageViews, excluding failed/duplicate and same-path query/hash changes.
- `trackEvent` still checks the exact production hostname for every custom GA event. Localhost, previews and staging are excluded even when a vendor stub exists.
- Attribution allowlisting and session storage remain, with ttclid added to the allowlist. External quote links and the retired-route redirect forward stored nonempty allowlisted values with URL encoding, preserving destination parameters and excluding contact fields and CTA labels. The downstream application owns persistence and submission success.

## Current event model

| Event | Trigger | Destination | Qualified lead / GA4 key event? |
| --- | --- | --- | --- |
| page_view | Initial config; externally enabled history measurement | GA4 | No / No |
| PageView | Initial successful route and successful distinct path | Meta | No / N/A |
| request_quote_click | Instrumented external-request links | GA4 | No / No |
| phone_click | Instrumented telephone links | GA4 | No / No |
| sample_report_click | Instrumented report links | GA4 | No / No |
| sample_report_section | Report-group button click | GA4 | No / No |

No application-owned form_start, form_submit, generate_lead, callback_request, Meta Lead or Meta CallbackRequest events remain. Do not treat link clicks or redirect-page views as accepted leads. Remaining unused legacy engagement-only components are not imported by active pages; they contain no submission forms or lead emitters.

## External checks still required

1. On the main website, verify that a single authoritative qualifying lead event fires only after successful processing. Use generate_lead as the qualified-lead event name if following the prior standardization plan.
2. In GA4/Ads, review key-event and imported conversion settings to avoid counting request clicks or overlapping legacy form-submit goals as qualified leads.
3. Verify Enhanced Measurement history behavior and external-form automatic events. Account settings are outside repository control.
4. In Meta Events Manager, check automatic events, custom-conversion rules and any server/browser overlap on the main website.
5. Confirm downstream attribution/session continuity: this project now forwards the 11 approved fields in request-link query parameters; local session storage itself remains origin-specific.
6. Remove obsolete local-form assets during the eventual deployment. This cleanup regenerated the checked-in build but did not publish it.

## Validation

The regression suite renders every active audience/service/report/privacy/not-found page with the real router, verifies external request destinations and absence of local submission forms and contact fields, exercises the retired quote route's real mount redirect with an inert renderer, and scans application source for webhook senders and lead emitters. Analytics initialization, host isolation and navigation checks remain. Tests do not fetch vendor scripts, contact webhooks or submit external forms.

The production build is regenerated in `dist/`, preserving IDs, host checks, SEO directives and SPA hosting configuration. All 17 updated tests pass, and the production build succeeds. Browser checks confirmed the replacement contact sections on the main landing page and a service page. Full-project ESLint reports four pre-existing errors (the CommonJS configuration global, the Icon component name, and two unused variables in an inactive legacy component); no new lint issues were introduced.
