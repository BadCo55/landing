import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getAgeRecommendations,
  validPropertyYear,
  getQuoteStepIds,
  createScopeReviewPayload,
} from '../src/utils/inspectionRecommendations.js'
const keys = (yearBuilt) =>
  getAgeRecommendations({ yearBuilt, currentYear: 2026 }).map((item) => item.key)
test('age recommendations respect exact cutoffs and reject missing or future years', () => {
  assert.deepEqual(keys(1972), [
    'drain_pipe_inspection',
    'lead_based_paint_inspection',
    'asbestos_inspection',
  ])
  assert.deepEqual(keys(1973), ['lead_based_paint_inspection', 'asbestos_inspection'])
  assert.deepEqual(keys(1978), ['asbestos_inspection'])
  assert.deepEqual(keys(1980), [])
  for (const year of [null, '', 0, 2027, 1975.5, 'not a year', Infinity]) {
    assert.equal(validPropertyYear(year, 2026), false)
    assert.deepEqual(keys(year), [])
  }
})
test('insurance requests retain qualification without unrelated age-driven add-ons', () => {
  for (const intent of ['insurance', 'wind', 'four-point']) {
    assert.deepEqual(getQuoteStepIds(intent), [1, 2, 5, 6])
    assert.deepEqual(getAgeRecommendations({ yearBuilt: 1960, intent }), [])
  }
  for (const intent of ['', 'general', 'commercial', 'new-construction', 'maintenance'])
    assert.deepEqual(getQuoteStepIds(intent), [1, 2, 3, 4, 5, 6])
  assert.equal(getAgeRecommendations({ yearBuilt: 1960, intent: 'maintenance' }).length, 3)
})
test('office request contains qualification, context and notes but no customer quote payload', () => {
  const form = {
    step1: {
      first_name: 'Test',
      last_name: 'Visitor',
      email: 'test@example.com',
      phone_number: '9545550123',
    },
    step2: {
      street_address: '123 Example Street',
      unit_number: '2',
      city: 'Davie',
      state: 'FL',
      zip_code: '33328',
      county: 'Broward',
      property_type: { key: 'single_family', value: 'Single Family Home' },
      year_built: 1965,
      square_footage: 2500,
    },
    step3: {
      pool: true,
      maintenance_priority: 'Routine yearly condition check',
      maintenance_notes: 'Review a recent roof repair',
    },
    step4: { selected_package: 'maintenance' },
    step5: {
      selected_services: {
        general_inspection: true,
        lead_based_paint_inspection: true,
        wind_mitigation: false,
      },
    },
    step6: { date_1: '2026-10-01T14:00:00Z' },
  }
  const payload = createScopeReviewPayload(form, 'maintenance', { gclid: 'click-123' })
  assert.deepEqual(Object.keys(payload), [
    'name',
    'email',
    'phone',
    'message',
    'date',
    'utm_parameters',
  ])
  for (const detail of [
    'YEARLY MAINTENANCE',
    'Broward',
    'maintenance',
    'lead based paint inspection',
    '1965',
    '2500',
    'Pool',
    'Review a recent roof repair',
    'Eastern time',
  ])
    assert.ok(payload.message.includes(detail))
  for (const key of ['mailersend', 'inspectionFee', 'quote', 'customer_quote'])
    assert.equal(payload[key], undefined)
  assert.ok(!payload.message.includes('$'))
  assert.equal(JSON.parse(payload.utm_parameters).gclid, 'click-123')
})
