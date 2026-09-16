import { validateLead } from './campaign.js'
export const projectTypes = [
  'Single-family home',
  'Townhome / multifamily',
  'Commercial property',
  'Other construction project',
]
export const projectStages = [
  'Planning / work not started',
  'Foundation / early construction',
  'Structure / framing',
  'Systems being installed',
  'Interior / finishing work',
  'Multiple stages / phased project',
]
export function validateProjectRequest(form, step = 0) {
  const errors = {}
  if (!step || step === 1)
    Object.assign(errors, validateLead({ ...form, service: 'Progressive construction inspection' }))
  if (!step || step === 2) {
    if (form.address.trim().length < 5) errors.address = 'Enter the project street address.'
    if (form.city.trim().length < 2) errors.city = 'Enter the project city.'
    if (!/^\d{5}$/.test(form.zip.trim())) errors.zip = 'Enter a 5-digit ZIP code.'
    if (!projectTypes.includes(form.propertyType)) errors.propertyType = 'Choose the project type.'
    if (!(Number(form.size) > 0 && Number(form.size) <= 10000000))
      errors.size = 'Enter the approximate total square footage.'
    if (!projectStages.includes(form.stage)) errors.stage = 'Choose the current construction stage.'
    if (form.scope.trim().length < 10)
      errors.scope = 'Describe the work or visits you’d like reviewed.'
    if (form.timing.trim().length < 3)
      errors.timing = 'Share your next milestone or requested timing.'
  }
  return errors
}
export function createProjectPayload(form, attribution) {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    message: [
      'QUALIFIED PROJECT REQUEST — Progressive construction inspection',
      'Pricing requires office review. No automated price has been issued.',
      `Property: ${form.address.trim()}, ${form.city.trim()}, FL ${form.zip.trim()}`,
      `Project type: ${form.propertyType}`,
      `Approximate total square footage: ${form.size}`,
      `Current construction stage: ${form.stage}`,
      `Requested scope / visits: ${form.scope.trim()}`,
      `Timing / next milestone: ${form.timing.trim()}`,
      form.notes.trim() ? `Builder / access / other notes: ${form.notes.trim()}` : '',
      'Campaign inspection: progressive',
    ]
      .filter(Boolean)
      .join('\n'),
    date: new Date().toISOString(),
    utm_parameters: JSON.stringify(attribution),
  }
}
