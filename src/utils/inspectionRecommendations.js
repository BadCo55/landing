// Age indicates a reason to discuss a service; it never establishes a defect or a required report.
export function validPropertyYear(value, currentYear = new Date().getFullYear()) {
  const year = Number(value)
  return Number.isInteger(year) && year >= 1800 && year <= currentYear
}
export function getAgeRecommendations({
  yearBuilt,
  intent = '',
  currentYear = new Date().getFullYear(),
}) {
  if (!validPropertyYear(yearBuilt, currentYear)) return []
  if (['insurance', 'wind', 'four-point', 'progressive'].includes(intent)) return []
  const year = Number(yearBuilt)
  const recommendations = []
  if (year < 1973)
    recommendations.push({
      key: 'drain_pipe_inspection',
      title: 'Drain pipe camera inspection',
      tag: 'Older plumbing',
      reason:
        'Homes from this era may have original cast-iron drains. A camera inspection can help assess the accessible drain line; the year alone does not tell us the pipe material.',
    })
  if (year < 1978)
    recommendations.push({
      key: 'lead_based_paint_inspection',
      title: 'Lead-based paint assessment',
      tag: 'Built before 1978',
      reason:
        'Older homes may contain lead-based paint, especially relevant when planning work on painted surfaces. Ask about an assessment; age alone does not confirm lead is present.',
      review: true,
      source: 'https://www.epa.gov/lead/reduce-risk-lead-exposure-home',
    })
  if (year < 1980)
    recommendations.push({
      key: 'asbestos_inspection',
      title: 'Asbestos assessment',
      tag: 'Discuss with your inspector',
      reason:
        'Some older building materials may contain asbestos. Discuss damaged materials or planned renovation with the team to decide whether assessment is appropriate. This is not a diagnosis or an automatic recommendation to sample.',
      review: true,
      source: 'https://www.epa.gov/asbestos/protect-your-family-exposures-asbestos',
    })
  return recommendations
}
export function isInsuranceIntent(intent) {
  return ['insurance', 'wind', 'four-point'].includes(intent)
}
export function getQuoteStepIds(intent) {
  return isInsuranceIntent(intent) ? [1, 2, 5, 6] : [1, 2, 3, 4, 5, 6]
}

export function createScopeReviewPayload(form, intent, attribution) {
  const serviceNames = Object.entries(form.step5.selected_services)
    .filter(([, selected]) => selected)
    .map(([key]) => key.replaceAll('_', ' '))
  return {
    name: `${form.step1.first_name} ${form.step1.last_name}`.trim(),
    email: form.step1.email.trim(),
    phone: form.step1.phone_number.trim(),
    message: [
      intent === 'maintenance'
        ? 'QUALIFIED YEARLY MAINTENANCE INSPECTION REQUEST'
        : 'QUALIFIED INSPECTION REQUEST — SCOPE AND PRICING REVIEW',
      'Office review required. No automated price or quote email has been issued.',
      `Inspection purpose: ${intent || 'general inspection'}`,
      `Property: ${form.step2.street_address}${form.step2.unit_number ? ' Unit ' + form.step2.unit_number : ''}, ${form.step2.city}, ${form.step2.state} ${form.step2.zip_code}`,
      `Property type: ${form.step2.property_type.value}. Year built: ${form.step2.year_built}. Total square feet: ${form.step2.square_footage}.`,
      `County: ${form.step2.county || 'Not provided'}`,
      `Selected starting package: ${form.step4.selected_package || 'Individual services'}`,
      `Selected services: ${serviceNames.join(', ')}`,
      'Property features: ' +
        Object.entries({
          pool: 'Pool',
          extra_structure: 'Extra structure',
          outdoor_kitchen: 'Outdoor kitchen',
          seawall: 'Seawall',
          crawlspace: 'Crawlspace',
          well_water: 'Well water',
        })
          .filter(([key]) => form.step3[key])
          .map(([, label]) => label)
          .join(', '),
      form.step3.extra_structure_details
        ? `Extra structure details: ${form.step3.extra_structure_details}`
        : '',
      form.step3.seawall_length ? `Seawall length: ${form.step3.seawall_length} ft` : '',
      form.step3.maintenance_priority
        ? `Maintenance priority: ${form.step3.maintenance_priority}`
        : '',
      form.step3.maintenance_notes ? `Maintenance notes: ${form.step3.maintenance_notes}` : '',
      'Preferred dates (Eastern time): ' +
        Object.values(form.step6)
          .filter(Boolean)
          .map((value) => {
            const date = new Date(value)
            return Number.isNaN(date.getTime())
              ? String(value)
              : date.toLocaleString('en-US', {
                  timeZone: 'America/New_York',
                  timeZoneName: 'short',
                })
          })
          .join('; '),
      'An inspection is not booked until confirmed by the office.',
    ]
      .filter(Boolean)
      .join('\n'),
    date: new Date().toISOString(),
    utm_parameters: JSON.stringify(attribution),
  }
}
