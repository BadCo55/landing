import { ATTRIBUTION_KEYS } from './campaign.js'

// Explicit route intent only: the main landing page never inherits a previous service choice.
export const inspectionIntents = {
  maintenance: {
    path: '/yearly-maintenance-inspection',
    quoteFlow: 'general',
    label: 'Yearly maintenance inspection',
    title: 'Your yearly home check-in.',
    guidance:
      'Tell us about the home, its age and your priorities. Choose the services you want reviewed; our team will confirm the maintenance scope and pricing.',
    package: 'maintenance',
  },
  general: {
    path: '/general-inspection',
    quoteFlow: 'general',
    label: 'General home inspection',
    title: 'Your general inspection request.',
    guidance:
      'Complete the property details, then choose a package. You can review every selected service before requesting your quote.',
    package: 'basic',
  },
  insurance: {
    path: '/insurance-inspection',
    quoteFlow: 'insurance',
    label: 'Insurance inspections',
    title: 'Your insurance inspection request.',
    guidance:
      'Share your property details and choose the reports your insurer requested. Wind mitigation, 4-point and roof inspection are separate choices.',
    package: 'insurance_only',
  },
  wind: {
    path: '/wind-mitigation',
    quoteFlow: 'insurance',
    label: 'Wind mitigation',
    title: 'Your wind mitigation request.',
    guidance:
      'Share the property details, then review your wind mitigation request and any other reports your insurer needs.',
    package: 'wind_only',
  },
  'four-point': {
    path: '/4-point-inspection',
    quoteFlow: 'insurance',
    label: '4-point inspection',
    title: 'Your 4-point inspection request.',
    guidance:
      'Share the property details, then review your 4-point request and any other reports your insurer needs.',
    package: 'four_point_only',
  },
  commercial: {
    path: '/commercial-inspection',
    quoteFlow: 'general',
    label: 'Commercial inspection',
    title: 'Your commercial inspection request.',
    guidance:
      'Select Commercial as the property type and enter the total square footage. Then review the scope and services for your property.',
  },
  progressive: {
    path: '/progressive-inspection',
    quoteFlow: 'general',
    label: 'Progressive construction inspection',
    title: 'Tell us about your construction project.',
    guidance:
      'Share the project stage, scope and timing. Our team will review the details with you and confirm pricing and availability.',
  },
  'new-construction': {
    path: '/new-construction-inspection',
    quoteFlow: 'general',
    label: 'New construction final inspection',
    title: 'Your new construction inspection request.',
    guidance:
      'Enter the completed home’s year built. For an eligible new home, choose New Construction to include structural and cosmetic inspection services.',
    package: 'new_construction',
  },
}
export function resolveInspectionIntent(value) {
  return typeof value === 'string' && Object.hasOwn(inspectionIntents, value) ? value : ''
}
export function inspectionContext(value) {
  return inspectionIntents[resolveInspectionIntent(value)] || null
}
export const INSPECTION_REQUEST_URL =
  'https://diversifiedhomeinspections.com/landing/inspection-request/general'

const quoteFlowDestinations = {
  general: INSPECTION_REQUEST_URL,
  insurance: 'https://diversifiedhomeinspections.com/landing/inspection-request/insurance',
}

export function inspectionRequestDestination(intent) {
  return quoteFlowDestinations[inspectionContext(intent)?.quoteFlow] || INSPECTION_REQUEST_URL
}

export function inspectionQuoteLink(attribution = {}, destination = INSPECTION_REQUEST_URL) {
  const url = new URL(destination)
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution?.[key]
    if (typeof value === 'string' && value.trim()) url.searchParams.set(key, value)
  }
  return url.toString()
}
