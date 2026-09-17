import test from 'node:test'
import assert from 'node:assert/strict'
import {
  inspectionIntents,
  resolveInspectionIntent,
  inspectionContext,
  inspectionQuoteLink,
  INSPECTION_REQUEST_URL,
  singleServicePackages,
  isInsurancePackage,
} from '../src/utils/inspectionIntent.js'
import { validateProjectRequest, createProjectPayload } from '../src/utils/projectRequest.js'
import { trackLead } from '../src/utils/campaign.js'
const project = {
  name: 'Example Visitor',
  email: 'visitor@example.com',
  phone: '(954) 555-0123',
  address: '123 Example Street',
  city: 'Davie',
  zip: '33328',
  propertyType: 'Single-family home',
  size: '2800',
  stage: 'Structure / framing',
  scope: 'Review work at agreed milestones during construction.',
  timing: 'Next milestone in two weeks',
  notes: 'Coordinate access with builder.',
  website: '',
}

test('quote links use the requested external destination; local intent stays explicit', () => {
  assert.equal(Object.keys(inspectionIntents).length, 8)
  assert.equal(new Set(Object.values(inspectionIntents).map((v) => v.path)).size, 8)
  for (const key of Object.keys(inspectionIntents))
    assert.equal(inspectionQuoteLink(key), INSPECTION_REQUEST_URL)
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
test('single insurance starters select exact services and exclude dynamic property extras', () => {
  assert.deepEqual(singleServicePackages.wind_only, ['wind_mitigation'])
  assert.deepEqual(singleServicePackages.four_point_only, ['four_point'])
  for (const key of ['insurance_only', 'wind_only', 'four_point_only'])
    assert.equal(isInsurancePackage(key), true)
  for (const key of ['basic', 'premium', 'pre_listing', 'new_construction'])
    assert.equal(isInsurancePackage(key), false)
})
test('progressive project request requires project qualification as well as contact information', () => {
  assert.deepEqual(validateProjectRequest(project), {})
  assert.equal(
    Object.keys(
      validateProjectRequest({ ...project, scope: '', stage: '', size: '', timing: '', zip: 'a' }),
    ).length,
    5,
  )
  assert.equal(
    Object.keys(validateProjectRequest({ ...project, email: '', phone: '', name: '' }, 1)).length,
    3,
  )
  assert.deepEqual(validateProjectRequest({ ...project, address: '', scope: '' }, 1), {})
  assert.ok(validateProjectRequest({ ...project, size: '-2' }).size)
  assert.ok(validateProjectRequest({ ...project, propertyType: 'injected' }).propertyType)
})
test('progressive request keeps contact integration contract and never invents a fee or quote email', () => {
  const payload = createProjectPayload(project, { gclid: 'click-id', utm_campaign: 'construction' })
  assert.deepEqual(Object.keys(payload), [
    'name',
    'email',
    'phone',
    'message',
    'date',
    'utm_parameters',
  ])
  for (const value of [project.address, project.stage, project.scope, project.timing, project.size])
    assert.ok(payload.message.includes(value))
  assert.match(payload.message, /Pricing requires office review/)
  assert.equal(payload.inspectionFee, undefined)
  assert.equal(payload.mailersend, undefined)
  assert.equal(JSON.parse(payload.utm_parameters).gclid, 'click-id')
})
test('confirmed project requests are qualified; callbacks remain separate and preview stays silent', () => {
  const events = []
  globalThis.window = {
    location: {
      hostname: 'landing.diversifiedhomeinspections.com',
      origin: 'https://landing.diversifiedhomeinspections.com',
      pathname: '/request-quote',
    },
    gtag: (...v) => events.push(v),
    fbq: (...v) => events.push(v),
  }
  try {
    trackLead(
      'Progressive Project Request',
      'Progressive construction inspection',
      {},
      { inspection: 'progressive' },
    )
    assert.deepEqual(
      events.map((e) => e[1]),
      ['form_submit', 'generate_lead', 'Lead'],
    )
    assert.equal(events[1][2].lead_type, 'qualified_project_request')
    assert.equal(events[1][2].inspection_intent, 'progressive')
    assert.ok(!JSON.stringify(events).includes(project.email))
    events.length = 0
    trackLead('Callback Request', 'Wind mitigation', {}, { inspection: 'wind' })
    assert.deepEqual(
      events.map((e) => e[1]),
      ['form_submit', 'callback_request', 'CallbackRequest'],
    )
    assert.equal(events[1][2].inspection_intent, 'wind')
    events.length = 0
    window.location.hostname = 'preview.example'
    trackLead(
      'Progressive Project Request',
      'Progressive construction inspection',
      {},
      { inspection: 'progressive' },
    )
    assert.equal(events.length, 0)
  } finally {
    delete globalThis.window
  }
})
