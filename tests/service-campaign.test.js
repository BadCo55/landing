import test from 'node:test'
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
