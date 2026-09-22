import test from 'node:test'
import assert from 'node:assert/strict'
import {
  captureAttribution,
  getUTMParams,
  isProductionHost,
  trackEvent,
} from '../src/utils/campaign.js'
const storage = () => {
  const data = new Map()
  return { getItem: (key) => data.get(key), setItem: (key, value) => data.set(key, value) }
}

test('only campaign parameters are captured, including advertising click IDs', () => {
  assert.deepEqual(getUTMParams('?utm_source=google&gclid=click-123&email=private@example.com'), {
    utm_source: 'google',
    gclid: 'click-123',
  })
})
test('attribution survives direct navigation and is replaced by a new campaign', () => {
  const session = storage()
  captureAttribution('?utm_source=google&utm_campaign=home&gclid=one', session)
  assert.equal(captureAttribution('', session).gclid, 'one')
  assert.deepEqual(captureAttribution('?utm_source=facebook', session), { utm_source: 'facebook' })
})
test('blocked or invalid storage does not break navigation or lose in-memory attribution', () => {
  const blocked = {
    getItem() {
      throw new Error('blocked')
    },
    setItem() {
      throw new Error('blocked')
    },
  }
  assert.deepEqual(captureAttribution('', blocked, { utm_source: 'google' }), {
    utm_source: 'google',
  })
  assert.deepEqual(captureAttribution('?gclid=new', blocked, { utm_source: 'old' }), {
    gclid: 'new',
  })
  assert.deepEqual(captureAttribution('', { getItem: () => '{broken' }), {})
})
test('only the production landing hostname enables live analytics', () => {
  assert.equal(isProductionHost('landing.diversifiedhomeinspections.com'), true)
  for (const host of [
    '127.0.0.1',
    'localhost',
    'diversified-inspections-campaign.opal-robin-5109.chatgpt.site',
    'landing.diversifiedhomeinspections.com.example.com',
  ])
    assert.equal(isProductionHost(host), false)
})
test('request clicks remain engagement events and previews stay silent', () => {
  const events = []
  globalThis.window = {
    location: { hostname: 'localhost', origin: 'http://localhost', pathname: '/' },
    gtag: (...args) => events.push(args),
  }
  try {
    trackEvent('request_quote_click', { placement: 'header' })
    assert.equal(events.length, 0)
    window.location.hostname = 'landing.diversifiedhomeinspections.com'
    window.location.origin = 'https://landing.diversifiedhomeinspections.com'
    trackEvent('request_quote_click', { placement: 'header' })
    assert.deepEqual(events, [
      [
        'event',
        'request_quote_click',
        {
          placement: 'header',
          page_location: 'https://landing.diversifiedhomeinspections.com/',
        },
      ],
    ])
  } finally {
    delete globalThis.window
  }
})
