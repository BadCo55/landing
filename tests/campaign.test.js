import test from 'node:test'
import assert from 'node:assert/strict'
import {
  captureAttribution,
  getUTMParams,
  isProductionHost,
  validateLead,
  createLeadPayload,
  sendLead,
  trackLead,
} from '../src/utils/campaign.js'
const lead = {
  name: 'Test Visitor',
  email: 'visitor@example.com',
  phone: '(954) 555-0123',
  service: 'General home inspection',
  address: '',
  message: '',
}
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
test('only the production landing hostname enables delivery and live analytics', () => {
  assert.equal(isProductionHost('landing.diversifiedhomeinspections.com'), true)
  for (const host of [
    '127.0.0.1',
    'localhost',
    'diversified-inspections-campaign.opal-robin-5109.chatgpt.site',
    'landing.diversifiedhomeinspections.com.example.com',
  ])
    assert.equal(isProductionHost(host), false)
})
test('lead validation accepts US phone formats and rejects incomplete or malformed data', () => {
  assert.deepEqual(validateLead(lead), {})
  assert.deepEqual(validateLead({ ...lead, phone: '+1 954 555 0123' }), {})
  assert.deepEqual(
    Object.keys(validateLead({ ...lead, name: '', email: 'bad', phone: '123', service: '' })),
    ['name', 'email', 'phone', 'service'],
  )
})
test('lead payload preserves the existing contact integration and includes selected service and attribution', () => {
  const payload = createLeadPayload(
    { ...lead, service: 'Wind mitigation', message: 'Deadline Friday' },
    { gclid: 'abc' },
    'insurance-inspection',
  )
  assert.deepEqual(Object.keys(payload), [
    'name',
    'email',
    'phone',
    'message',
    'date',
    'utm_parameters',
  ])
  assert.match(payload.message, /Wind mitigation/)
  assert.match(payload.message, /Deadline Friday/)
  assert.deepEqual(JSON.parse(payload.utm_parameters), { gclid: 'abc' })
})
test('delivery waits for success and keeps the existing CORS-compatible request contract', async () => {
  let request
  const result = await sendLead({ name: 'Test' }, async (url, init) => {
    request = { url, ...init }
    return { ok: true }
  })
  assert.equal(result, true)
  assert.equal(request.method, 'POST')
  assert.equal(request.headers['Content-Type'], 'application/x-www-form-urlencoded')
  assert.equal(request.body, '{"name":"Test"}')
  assert.ok(request.signal instanceof AbortSignal)
})
test('HTTP failures and network errors never count as successful delivery', async () => {
  await assert.rejects(
    sendLead({}, async () => ({ ok: false })),
    /not confirmed/,
  )
  await assert.rejects(
    sendLead({}, async () => {
      throw new Error('network')
    }),
    /network/,
  )
})
test('preview conversions produce no live tracking', () => {
  const events = []
  globalThis.window = {
    location: { hostname: 'localhost' },
    gtag: (...args) => events.push(args),
    fbq: (...args) => events.push(args),
  }
  trackLead('Contact Form', 'General home inspection', {})
  assert.equal(events.length, 0)
  delete globalThis.window
})
test('confirmed production lead emits the legacy event, GA lead, and Meta lead without contact information', () => {
  const events = []
  globalThis.window = {
    location: {
      hostname: 'landing.diversifiedhomeinspections.com',
      origin: 'https://landing.diversifiedhomeinspections.com',
      pathname: '/',
    },
    gtag: (...args) => events.push(args),
    fbq: (...args) => events.push(args),
  }
  trackLead('Request Quote Form', 'General home inspection', { utm_source: 'google' })
  assert.deepEqual(
    events.map((item) => item[1]),
    ['form_submit', 'generate_lead', 'Lead'],
  )
  assert.equal(JSON.stringify(events).includes(lead.email), false)
  delete globalThis.window
})

test('callback requests never fire the qualified quote conversion', () => {
  const events = []
  globalThis.window = { location: { hostname: 'landing.diversifiedhomeinspections.com', origin: 'https://landing.diversifiedhomeinspections.com', pathname: '/' }, gtag: (...args) => events.push(args), fbq: (...args) => events.push(args) }
  trackLead('Callback Request', 'General home inspection', { utm_source: 'google' })
  assert.deepEqual(events.map(item => item[1]), ['form_submit', 'callback_request', 'CallbackRequest'])
  assert.equal(events[1][2].lead_type, 'callback')
  assert.ok(!events.some(item => ['generate_lead', 'Lead'].includes(item[1])))
  delete globalThis.window
})
