import { resolveInspectionIntent } from './inspectionIntent.js'
export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'fbclid',
]
const STORAGE_KEY = 'dhi_campaign_attribution'

export function getUTMParams(search) {
  const query = new URLSearchParams(search)
  return Object.fromEntries(
    ATTRIBUTION_KEYS.filter((key) => query.get(key)).map((key) => [
      key,
      query.get(key).slice(0, 250),
    ]),
  )
}

export function captureAttribution(search, storage, fallback = {}) {
  const incoming = getUTMParams(search)
  let saved = fallback
  try {
    saved = JSON.parse(storage?.getItem(STORAGE_KEY) || JSON.stringify(fallback))
  } catch {
    /* Storage is optional. */
  }
  const cleanSaved = Object.fromEntries(
    ATTRIBUTION_KEYS.filter((key) => typeof saved?.[key] === 'string').map((key) => [
      key,
      saved[key].slice(0, 250),
    ]),
  )
  const attribution = Object.keys(incoming).length ? incoming : cleanSaved
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    /* Private browsing may disable storage. */
  }
  return attribution
}

export function isProductionHost(hostname) {
  return hostname === 'landing.diversifiedhomeinspections.com'
}

export function trackEvent(event, properties = {}) {
  if (typeof window === 'undefined' || !isProductionHost(window.location.hostname)) return
  try {
    window.gtag?.('event', event, {
      ...properties,
      page_location: window.location.origin + window.location.pathname,
    })
  } catch {
    /* Analytics must not block visitors. */
  }
}

export function trackLead(formName, service, attribution, context = {}) {
  const project = formName === 'Progressive Project Request'
  const qualified = formName === 'Request Quote Form' || project
  const inspection = resolveInspectionIntent(context.inspection)
  const leadType = project
    ? 'qualified_project_request'
    : qualified
      ? 'qualified_quote'
      : 'callback'
  const properties = {
    form_name: formName,
    service,
    lead_type: leadType,
    ...(inspection ? { inspection_intent: inspection } : {}),
    ...attribution,
  }
  trackEvent('form_submit', properties)
  trackEvent(qualified ? 'generate_lead' : 'callback_request', properties)
  if (typeof window !== 'undefined' && isProductionHost(window.location.hostname)) {
    try {
      if (qualified)
        window.fbq?.('track', 'Lead', {
          content_name: service,
          content_category: leadType,
        })
      else window.fbq?.('trackCustom', 'CallbackRequest', { content_name: service })
    } catch {
      /* Optional analytics. */
    }
  }
}

export function validateLead(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Please enter a valid email address.'
  const digits = form.phone.replace(/\D/g, '')
  if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))))
    errors.phone = 'Please enter a 10-digit phone number.'
  if (!form.service) errors.service = 'Please choose an inspection type.'
  return errors
}

export function createLeadPayload(form, attribution, audience) {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    message: [
      'Callback request — not a completed inspection quote',
      'Inspection: ' + form.service,
      'Property: ' + (form.address.trim() || 'Not provided'),
      'Campaign audience: ' + audience,
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n'),
    date: new Date().toISOString(),
    utm_parameters: JSON.stringify(attribution),
  }
}

export async function sendLead(
  payload,
  fetcher = fetch,
  endpoint = 'https://hooks.zapier.com/hooks/catch/5555872/2sxd8wt/',
) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)
  try {
    // Preserve the existing Zap's JSON body and CORS-simple content type.
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error('Lead delivery was not confirmed.')
    return true
  } finally {
    clearTimeout(timeout)
  }
}
