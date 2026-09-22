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
  'ttclid',
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
