import test from 'node:test'
import { captureAttribution } from '../src/utils/campaign.js'
import assert from 'node:assert/strict'
import {
  inspectionIntents,
  resolveInspectionIntent,
  inspectionContext,
  inspectionQuoteLink,
  INSPECTION_REQUEST_URL,
} from '../src/utils/inspectionIntent.js'
test('quote links use the requested external destination; local intent stays explicit', () => {
  assert.equal(Object.keys(inspectionIntents).length, 8)
  assert.equal(new Set(Object.values(inspectionIntents).map((v) => v.path)).size, 8)
  assert.equal(inspectionQuoteLink(), INSPECTION_REQUEST_URL)
  for (const value of [
    undefined,
    null,
    '',
    ['wind', 'general'],
    'toString',
    'unknown',
    'https://example.com',
  ]) {
    assert.equal(resolveInspectionIntent(value), '')
    assert.equal(inspectionContext(value), null)
    assert.equal(inspectionQuoteLink(value), INSPECTION_REQUEST_URL)
  }
})

test('stored acquisition UTMs survive internal navigation and are forwarded', () => {
  const saved = new Map()
  const storage = {
    getItem: (key) => saved.get(key),
    setItem: (key, value) => saved.set(key, value),
  }
  captureAttribution(
    '?utm_source=google&utm_medium=cpc&utm_campaign=summer&utm_term=inspection&utm_content=ad1',
    storage,
  )
  const stored = captureAttribution('', storage)
  assert.deepEqual(Object.fromEntries(new URL(inspectionQuoteLink(stored)).searchParams), {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'summer',
    utm_term: 'inspection',
    utm_content: 'ad1',
  })
})

test('Google and Microsoft click IDs are forwarded', () => {
  const ids = {
    gclid: 'google-click',
    gbraid: 'google-braid',
    wbraid: 'web-braid',
    msclkid: 'ms-click',
  }
  assert.deepEqual(Object.fromEntries(new URL(inspectionQuoteLink(ids)).searchParams), ids)
})

test('Meta and TikTok click IDs are captured, stored and forwarded', () => {
  let saved
  const storage = {
    getItem: () => saved,
    setItem: (_, value) => {
      saved = value
    },
  }
  captureAttribution('?fbclid=meta-click&ttclid=tiktok-click', storage)
  const stored = captureAttribution('', storage)
  assert.deepEqual(Object.fromEntries(new URL(inspectionQuoteLink(stored)).searchParams), {
    fbclid: 'meta-click',
    ttclid: 'tiktok-click',
  })
})

test('empty, whitespace and non-string values are omitted', () => {
  assert.equal(
    inspectionQuoteLink({
      utm_source: '',
      utm_medium: '  ',
      utm_campaign: null,
      gclid: undefined,
      fbclid: [],
      ttclid: 0,
    }),
    INSPECTION_REQUEST_URL,
  )
  assert.equal(inspectionQuoteLink(), INSPECTION_REQUEST_URL)
})

test('attribution values are URL encoded without becoming extra parameters', () => {
  const result = inspectionQuoteLink({
    utm_campaign: 'South Florida & homes',
    utm_content: 'a+b/c?d=e#f',
    ttclid: '雪%id',
  })
  assert.equal(
    result,
    INSPECTION_REQUEST_URL +
      '?utm_campaign=South+Florida+%26+homes&utm_content=a%2Bb%2Fc%3Fd%3De%23f&ttclid=%E9%9B%AA%25id',
  )
  assert.equal(new URL(result).searchParams.get('utm_content'), 'a+b/c?d=e#f')
})

test('existing destination parameters and fragment are preserved', () => {
  const destination = INSPECTION_REQUEST_URL + '?form=general&option=one&option=two#details'
  const url = new URL(inspectionQuoteLink({ utm_source: 'google', gclid: 'click' }, destination))
  assert.equal(url.origin + url.pathname, INSPECTION_REQUEST_URL)
  assert.equal(url.searchParams.get('form'), 'general')
  assert.deepEqual(url.searchParams.getAll('option'), ['one', 'two'])
  assert.equal(url.hash, '#details')
  assert.equal(url.searchParams.get('utm_source'), 'google')
})

test('only allowlisted attribution is appended; contact details and CTA labels are excluded', () => {
  const url = new URL(
    inspectionQuoteLink({
      utm_source: 'google',
      utm_campaign: 'acquisition',
      name: 'Example Person',
      email: 'test@example.com',
      phone: '9545550123',
      address: '123 Example St',
      property_address: '123 Example St',
      placement: 'header',
      audience: 'homebuyer',
      inspection_intent: 'wind',
      redirect: 'https://example.com',
    }),
  )
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    utm_source: 'google',
    utm_campaign: 'acquisition',
  })
})
