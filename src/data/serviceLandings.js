import { inspectionIntents } from '../utils/inspectionIntent.js'

const home = '/img/campaign/home.jpg'
const construction = '/img/campaign/construction.jpg'
const commercial = '/img/campaign/commercial.jpg'
const insuranceFaq = [
  'Will the inspection guarantee insurance or a discount?',
  'Your insurer decides eligibility, required reports and any credits. We document the property’s findings; a report does not guarantee coverage or savings.',
]
const contactFaq = [
  'What if I don’t have all the property details?',
  'The detailed inspection request is the best place to start when you have the information. If something is missing, use the basic-details option below and our office will help you take the next step.',
]
const areaFaq = [
  'Which areas do you serve?',
  'We serve properties across Broward, Miami-Dade and Palm Beach counties. Share the property address so our office can confirm availability for your location.',
]

export const serviceLandings = {
  maintenance: {
    eyebrow: 'YEARLY MAINTENANCE INSPECTIONS · SOUTH FLORIDA',
    headline: 'Love your home.',
    accent: 'Look after its future.',
    intro:
      'A closer look at the home you already own. Make a yearly condition check part of your routine and plan the next steps with a clearer picture.',
    image: home,
    imageAlt: 'South Florida home with a pool and covered outdoor living area',
    imageLabel: 'For the home you’re keeping, year after year.',
    highlights: [
      'Current property condition',
      'Aging systems & visible concerns',
      'Maintenance priorities',
    ],
    scopeEyebrow: 'A CHECK-IN FOR YOUR HOME',
    scopeTitle: 'Small observations. Better decisions.',
    scopeIntro:
      'Tell us what has changed, what concerns you and what you’d like reviewed. We’ll confirm the inspection scope for your home before scheduling.',
    scope: [
      [
        'home',
        'Roof & exterior',
        'Discuss accessible roof and exterior conditions, signs of wear and the areas you would like the inspector to review.',
      ],
      [
        'wind',
        'Everyday systems',
        'Review the condition of plumbing, electrical and heating and cooling systems within the agreed scope.',
      ],
      [
        'shield',
        'Changes worth investigating',
        'Bring recent leaks, visible moisture concerns, unusual wear or repairs to the team’s attention. Additional testing is selected separately.',
      ],
      [
        'report',
        'A plan for what comes next',
        'Use the inspection findings to prioritize further evaluation, repairs and routine care.',
      ],
    ],
    insightLabel: 'HOMEOWNERSHIP, WITH A LITTLE MORE CLARITY',
    insightTitle: 'You don’t have to be moving to take a closer look.',
    insight:
      'A home changes over time. A regular condition review creates space to look at aging systems and questions that are easy to put off—and gives you useful information for your next maintenance decision.',
    takeaway:
      'Share the home’s age, recent repairs and your biggest questions when you request an inspection.',
    faqs: [
      [
        'Is this a recurring subscription?',
        'No. This form requests an individual maintenance inspection. It does not enroll you in a recurring plan or authorize future charges.',
      ],
      [
        'Do I need to have a problem already?',
        'No. You can request a routine condition check or tell us about specific changes and concerns. Our office will confirm the scope that fits your property.',
      ],
      [
        'What does the yearly maintenance inspection include?',
        'The scope is confirmed for your home. The request starts with a general condition review, and you can select additional services for features or concerns you want assessed.',
      ],
      [
        'Will I get an automatic price?',
        'No. Your details go to our office team. We review the request and contact you about scope, pricing and availability.',
      ],
      areaFaq,
      contactFaq,
    ],
    related: ['general', 'insurance'],
  },
  general: {
    eyebrow: 'GENERAL HOME INSPECTIONS · SOUTH FLORIDA',
    headline: 'Know the home.',
    accent: 'Own the decision.',
    intro:
      'Look beyond the showing. Get a detailed picture of the property’s condition, with the information you need to move forward confidently.',
    image: home,
    imageAlt: 'South Florida home with a pool and covered patio',
    imageLabel: 'A closer look at the place you’ll call home.',
    highlights: [
      'Major systems & structure',
      'Roof & termite specialists',
      'Repair cost estimates',
    ],
    scopeEyebrow: 'MORE THAN A WALK-THROUGH',
    scopeTitle: 'The details that make a difference.',
    scopeIntro:
      'A general inspection connects what we observe with what it means for the property. Choose the inspection package and additional services that fit your home.',
    scope: [
      [
        'home',
        'The building itself',
        'Accessible structural components, exterior and interior conditions, with observations organized into a detailed report.',
      ],
      [
        'shield',
        'The systems you depend on',
        'Electrical, plumbing, heating and cooling systems, plus the applicable components of the home.',
      ],
      [
        'team',
        'Specialist attention',
        'Licensed roof and termite specialists contribute their findings as part of the general inspection offering.',
      ],
      [
        'report',
        'Useful next steps',
        'Documented deficiencies and repair cost estimates help you understand concerns and plan your next conversation.',
      ],
    ],
    insightLabel: 'BEFORE YOU COMMIT',
    insightTitle: 'A beautiful home can still have important issues.',
    insight:
      'Your inspection gives you a clearer view of the property before the next big decision. Review the findings, understand the condition and ask better questions.',
    takeaway: 'Buying, selling or planning ahead? Start with the property details.',
    faqs: [
      [
        'What does a general home inspection cover?',
        'The inspection assesses the home’s accessible systems and components. Scope varies with the property and package; condo inspections, for example, differ from single-family homes. Your selected services are shown before you submit your quote request.',
      ],
      [
        'Is this the same as an insurance inspection?',
        'No. A general inspection looks at overall property condition. Insurance inspections document specific information requested by an insurer. Your quote lets you choose the services needed for both purposes.',
      ],
      [
        'Can I see an example report?',
        'Yes. Explore the sample general, roof and termite reports to see how findings and photographs are presented. Actual reports depend on the property and services ordered.',
      ],
      areaFaq,
      contactFaq,
    ],
    showReport: true,
    related: ['insurance', 'new-construction'],
  },
  insurance: {
    eyebrow: 'INSURANCE INSPECTIONS · SOUTH FLORIDA',
    headline: 'The right reports.',
    accent: 'Your next step covered.',
    intro:
      'Renewing, changing carriers or arranging coverage? Get the inspection documentation your insurer asks for, with help choosing the right services.',
    image: home,
    imageAlt: 'South Florida house with a tile roof and screened pool area',
    imageLabel: 'Start with what your insurer requested.',
    highlights: ['Wind mitigation', '4-point inspections', 'Roof certification'],
    scopeEyebrow: 'CHOOSE THE REPORTS YOU NEED',
    scopeTitle: 'One property. Different insurance questions.',
    scopeIntro:
      'An insurer may request one report or a combination. Bring their requirements and review your selected services before submitting.',
    scope: [
      [
        'wind',
        'Wind mitigation',
        'Documents wind-resistant construction features that your insurer may consider for premium credits.',
      ],
      [
        'home',
        '4-point inspection',
        'Focuses on the roof, electrical, plumbing, and heating and cooling systems for insurance review.',
      ],
      [
        'shield',
        'Roof certification',
        'Provides roof information for insurance purposes when requested by your carrier.',
      ],
      [
        'team',
        'Help choosing your scope',
        'Not sure which reports were requested? Share the details with our office before selecting your services.',
      ],
    ],
    insightLabel: 'LESS GUESSWORK',
    insightTitle: 'Let your insurer’s request guide the inspection.',
    insight:
      'Wind mitigation and 4-point inspections answer different questions. A roof certification may also be requested. Confirm the requirements with your carrier so you request the right combination.',
    takeaway: 'Have an email from your agent? Keep it handy as you prepare your request.',
    faqs: [
      [
        'Do I need every insurance inspection?',
        'Not necessarily. Requirements vary by insurer and property. Select wind mitigation, 4-point or roof inspection according to the request from your insurer. The insurance form shows those reports as separate choices.',
      ],
      [
        'What is the difference between wind mitigation and 4-point?',
        'Wind mitigation documents construction features related to wind resistance. A 4-point inspection documents the condition of four main systems: roof, electrical, plumbing, and heating/cooling.',
      ],
      insuranceFaq,
      areaFaq,
      contactFaq,
    ],
    related: ['wind', 'four-point'],
  },
  wind: {
    eyebrow: 'WIND MITIGATION INSPECTIONS · SOUTH FLORIDA',
    headline: 'Know your home’s',
    accent: 'wind-resistant features.',
    intro:
      'Give your insurer a documented look at the construction features that help your home resist wind—and may qualify for available insurance credits.',
    image: home,
    imageAlt: 'Tile-roofed South Florida home',
    imageLabel: 'The features behind your wind mitigation report.',
    highlights: ['Licensed inspector', 'Roof & attachment details', 'Opening protection'],
    scopeEyebrow: 'BUILT FOR THE ELEMENTS',
    scopeTitle: 'It’s what’s behind the roofline.',
    scopeIntro:
      'A wind mitigation inspection documents specific construction features. Your insurer reviews the findings and determines any applicable credits.',
    scope: [
      [
        'home',
        'Construction & roof covering',
        'Construction year, roof covering and roof geometry provide context for the home’s wind-resistant design.',
      ],
      [
        'shield',
        'Roof attachments',
        'The inspection documents roof-deck and roof-to-wall attachment details where accessible.',
      ],
      [
        'wind',
        'Opening protection',
        'Windows, doors and other openings are reviewed for the protection relevant to the report.',
      ],
      [
        'report',
        'Documentation for your insurer',
        'Receive findings to share with your insurance agent as part of their review of available credits.',
      ],
    ],
    insightLabel: 'DOCUMENT WHAT’S ALREADY THERE',
    insightTitle: 'Your home’s construction tells a story.',
    insight:
      'A wind mitigation report helps your insurer understand the features present at the time of inspection. It is useful when reviewing a policy or documenting qualifying improvements.',
    takeaway: 'Share relevant roof or opening-protection records with your inspector.',
    faqs: [
      [
        'Does wind mitigation include a 4-point inspection?',
        'They are separate inspections. The wind mitigation request starts with that report selected. Add a 4-point inspection in the service review if your insurer needs both.',
      ],
      insuranceFaq,
      [
        'Should I request this after replacing a roof or windows?',
        'An inspection can document updated features. Tell our office what changed and check with your insurer about the documentation they require.',
      ],
      areaFaq,
      contactFaq,
    ],
    related: ['four-point', 'insurance'],
  },
  'four-point': {
    eyebrow: '4-POINT INSPECTIONS · SOUTH FLORIDA',
    headline: 'Four key systems.',
    accent: 'One focused report.',
    intro:
      'Get a clear record of your roof, electrical, plumbing and heating and cooling systems for your insurer’s review.',
    image: home,
    imageAlt: 'South Florida residence with a covered outdoor living area',
    imageLabel: 'Focused on the systems your insurer asks about.',
    highlights: ['Roof', 'Electrical & plumbing', 'Heating & cooling'],
    scopeEyebrow: 'FOCUSED INSURANCE DOCUMENTATION',
    scopeTitle: 'The four points. Clearly documented.',
    scopeIntro:
      'This targeted inspection provides information about the condition of four main systems. It serves an insurance purpose and has a different scope from a full home inspection.',
    scope: [
      [
        'home',
        'Roof',
        'Observations of roof condition and the information required for the insurance report.',
      ],
      [
        'shield',
        'Electrical',
        'Documentation of the electrical system and observed concerns relevant to the inspection.',
      ],
      [
        'report',
        'Plumbing',
        'A focused review of plumbing components and their observed condition.',
      ],
      [
        'wind',
        'Heating & cooling',
        'Information about the HVAC system and observed conditions for insurance review.',
      ],
    ],
    insightLabel: 'KEEP YOUR REQUEST FOCUSED',
    insightTitle: 'The report your carrier asked for.',
    insight:
      'A 4-point inspection is often part of an insurance request. Confirm the carrier’s requirements, share your property information and select any additional reports they need.',
    takeaway: 'You receive a copy of your report to share with your insurance agent.',
    faqs: [
      [
        'Is a 4-point inspection a full home inspection?',
        'No. It focuses on four systems for insurance purposes. If you are buying a home and want a broader assessment of its condition, consider a general inspection as well.',
      ],
      [
        'Can I request only a 4-point inspection?',
        'Yes. The 4-point request starts with that report selected. Review it and any additional insurance reports before submitting.',
      ],
      insuranceFaq,
      areaFaq,
      contactFaq,
    ],
    related: ['wind', 'general'],
  },
  commercial: {
    eyebrow: 'COMMERCIAL PROPERTY INSPECTIONS · SOUTH FLORIDA',
    headline: 'A clearer picture.',
    accent: 'A stronger investment.',
    intro:
      'Understand the condition behind the transaction. Get detailed findings and repair estimates for your commercial property decisions.',
    image: commercial,
    imageAlt: 'Commercial property exterior from Diversified Home Inspections',
    imageLabel: 'Built around the property and its intended use.',
    highlights: [
      'Commercial & multifamily',
      'Specialist inspection team',
      'Itemized repair estimates',
    ],
    scopeEyebrow: 'LOOK BEYOND THE NUMBERS',
    scopeTitle: 'Know what the building needs.',
    scopeIntro:
      'From retail and office space to warehouses, motels and multifamily properties, the inspection begins with the building’s size, use and selected scope.',
    scope: [
      [
        'building',
        'Property condition',
        'A detailed assessment of the building’s accessible systems and components for the agreed inspection scope.',
      ],
      [
        'team',
        'Specialist knowledge',
        'Registered building inspection expertise, with licensed roof and termite specialists contributing their findings.',
      ],
      [
        'report',
        'Repair estimates',
        'Documented deficiencies and itemized repair cost estimates support your review of the property.',
      ],
      [
        'shield',
        'Scope that fits the site',
        'Discuss additional or specialized services based on the property. Environmental testing and other add-ons require their own scope.',
      ],
    ],
    insightLabel: 'DUE DILIGENCE WITH CONTEXT',
    insightTitle: 'The purchase price is only part of the picture.',
    insight:
      'Understanding observed deficiencies and potential repairs helps you evaluate the building with more context. Share the property type, size and timing so our team can review the assignment.',
    takeaway: 'In the quote form, select Commercial and enter the total building size.',
    faqs: [
      [
        'What types of commercial properties do you inspect?',
        'Our commercial services include offices, retail properties, warehouses, motels and multifamily buildings. Contact our office about the scope and access requirements for your property.',
      ],
      [
        'Are environmental tests included?',
        'Specialized services such as mold sampling or asbestos inspection are not assumed to be included in every commercial inspection. Discuss any specific concerns with our team and review the selected scope.',
      ],
      [
        'How is a commercial quote prepared?',
        'Our office uses your confirmed property type, square footage and selected services to review the request. Our office reviews project details and availability; complex assignments may need additional discussion.',
      ],
      areaFaq,
      contactFaq,
    ],
    related: ['progressive', 'general'],
  },
  progressive: {
    eyebrow: 'PROGRESSIVE CONSTRUCTION INSPECTIONS · SOUTH FLORIDA',
    headline: 'As your home takes shape,',
    accent: 'keep a closer eye on it.',
    intro:
      'An independent look during construction helps you understand the work as it progresses. Plan inspections around your project’s current stage and upcoming milestones.',
    image: construction,
    imageAlt: 'New residential construction featured by Diversified Home Inspections',
    imageLabel: 'For the work happening before the home is finished.',
    highlights: ['During construction', 'Project-specific scope', 'Visits coordinated with you'],
    scopeEyebrow: 'OVERSIGHT ALONG THE WAY',
    scopeTitle: 'Progress deserves a closer look.',
    scopeIntro:
      'New Home Progressive Inspections assess work while construction is underway. The timing and scope of visits are coordinated with your project.',
    scope: [
      [
        'building',
        'Your current stage',
        'Tell us what is complete, what is underway and what work is coming next.',
      ],
      [
        'clock',
        'Coordinated visits',
        'Discuss construction timing and access so the inspection can be planned around the work.',
      ],
      [
        'report',
        'Observed conditions',
        'Get an independent assessment of the work available for inspection at the agreed stage.',
      ],
      [
        'team',
        'A defined project scope',
        'Our office reviews the project, requested visits and expectations before confirming pricing and availability.',
      ],
    ],
    insightLabel: 'BEFORE THE FINAL WALK-THROUGH',
    insightTitle: 'Stay informed while the work moves forward.',
    insight:
      'Construction changes quickly. A progressive inspection is an opportunity to review the work at an agreed point in the project and bring observations into your conversations with the builder.',
    takeaway: 'Already complete? Choose the final new-construction inspection instead.',
    faqs: [
      [
        'When should I contact you during construction?',
        'Contact us with the current stage and next milestone as early as possible. Our team will discuss access, the work available to inspect and suitable timing for a visit.',
      ],
      [
        'Does this include every construction phase?',
        'The number, timing and scope of visits are agreed for your project. A request does not automatically include every phase or a fixed schedule of inspections.',
      ],
      [
        'How do I get pricing?',
        'Complete the project request with the address, project size, stage, scope and timing. Our team reviews those details before confirming pricing. This service does not receive an automated home-inspection price.',
      ],
      [
        'How is this different from a final new-construction inspection?',
        'Progressive inspections take place while work is underway. A final new-construction inspection assesses the completed home, including structural and cosmetic conditions.',
      ],
      areaFaq,
      contactFaq,
    ],
    related: ['new-construction', 'general'],
  },
  'new-construction': {
    eyebrow: 'FINAL NEW-CONSTRUCTION INSPECTIONS · SOUTH FLORIDA',
    headline: 'Brand new.',
    accent: 'Still worth a closer look.',
    intro:
      'Construction is complete. Before the next big step, get an independent inspection of the home’s structural and cosmetic conditions.',
    image: home,
    imageAlt: 'Completed South Florida home with a pool and covered patio',
    imageLabel: 'For the completed home, before you settle in.',
    highlights: ['Completed new homes', 'Structural & cosmetic', 'Visible finish details'],
    scopeEyebrow: 'LOOK PAST THE NEW-HOME FEEL',
    scopeTitle: 'From the structure to the finishing touches.',
    scopeIntro:
      'A New Home Construction Inspection looks at the completed property. The new-construction package includes cosmetic conditions alongside its selected inspection services.',
    scope: [
      [
        'home',
        'Structure & systems',
        'An independent assessment of accessible components and systems in the completed home.',
      ],
      [
        'report',
        'Cosmetic conditions',
        'Visible finish details such as paint, grout, scratches and chips receive attention.',
      ],
      [
        'shield',
        'Selected inspection services',
        'Review the new-construction package and its roof, termite, wind mitigation and other applicable services in your quote.',
      ],
      [
        'team',
        'An informed next conversation',
        'Use the observed findings to discuss concerns and next steps with the builder.',
      ],
    ],
    insightLabel: 'A FRESH START, INFORMED',
    insightTitle: 'New doesn’t mean there’s nothing to find.',
    insight:
      'A completed new home brings together many trades and finishing details. An independent inspection helps you take a closer look before your final conversations with the builder.',
    takeaway: 'Still under construction? Ask about progressive inspections.',
    faqs: [
      [
        'When is the final inspection performed?',
        'This service is for a completed new home. Coordinate access and your target timing with our office and the builder so the agreed areas and systems are available to inspect.',
      ],
      [
        'Does the inspection include cosmetic conditions?',
        'Yes. New Home Construction Inspections include structural and cosmetic inspection. Cosmetic observations may include visible paint, grout, scratches and chips.',
      ],
      [
        'How do I choose the new-construction package?',
        'Enter the home’s year built in the detailed form. The existing quote tool shows the New Construction package for homes built within its eligible new-home range. Contact our office if your situation needs review.',
      ],
      [
        'What if construction is still underway?',
        'Use our progressive inspection page for a project request. Those visits are coordinated around the construction stage and have their own agreed scope and pricing.',
      ],
      areaFaq,
      contactFaq,
    ],
    related: ['progressive', 'general'],
  },
}
for (const [key, page] of Object.entries(serviceLandings)) {
  Object.assign(page, inspectionIntents[key], {
    key,
    cta: key === 'progressive' ? 'Request a project review' : 'Request my inspection',
  })
}

// Each campaign gets imagery and an editorial focus that reflect its inspection purpose.
const editorial = {
  general: {
    number: '01',
    short: 'General inspection',
    eyebrow: 'FOR YOUR NEXT BIG DECISION',
    headline: 'Know before',
    accent: 'you call it home.',
    image: '/img/campaign/home.jpg',
    focus: 'The whole picture.',
    detailImage: '/img/campaign/completed-home.jpg',
    detailAlt: 'Architectural exterior of a completed home',
    cardTitle: 'A home is more than its first impression.',
    cardCopy:
      'Structure. Systems. The details in between. Understand what you’re buying before the next big decision.',
    outcome: 'Clarity for the next chapter.',
  },
  insurance: {
    number: '02',
    short: 'Insurance inspections',
    eyebrow: 'DOCUMENTATION WITH DIRECTION',
    headline: 'Your property.',
    accent: 'The right reports.',
    image: '/img/campaign/roof-aerial.jpg',
    focus: 'Made for the request.',
    detailImage: '/img/campaign/completed-home.jpg',
    detailAlt: 'Exterior of a South Florida property',
    cardTitle: 'Start with what your carrier needs.',
    cardCopy:
      'Wind mitigation, 4-point and roof reports answer different questions. Request the combination your agent has asked for.',
    outcome: 'Less guesswork. A clearer next step.',
  },
  wind: {
    number: '03',
    short: 'Wind mitigation',
    eyebrow: 'A CLOSER LOOK AT RESILIENCE',
    headline: 'Built for Florida.',
    accent: 'Documented in detail.',
    image: '/img/campaign/roof-aerial.jpg',
    focus: 'Beyond the roofline.',
    detailImage: '/img/campaign/roof-aerial.jpg',
    detailAlt: 'Roof geometry and covering of a canal-front Florida home',
    cardTitle: 'The details behind wind resistance.',
    cardCopy:
      'Roof geometry, attachments and opening protection. Document the features your insurer considers for available credits.',
    outcome: 'Know the features that matter.',
  },
  'four-point': {
    number: '04',
    short: '4-point inspection',
    eyebrow: 'FOUR SYSTEMS. A FOCUSED PICTURE.',
    headline: 'The essentials.',
    accent: 'Clearly documented.',
    image: '/img/campaign/completed-home.jpg',
    focus: 'Four points of focus.',
    detailImage: '/img/campaign/roof-aerial.jpg',
    detailAlt: 'Accessible roof exterior on a South Florida home',
    cardTitle: 'Focused on your insurer’s questions.',
    cardCopy:
      'Roof, electrical, plumbing, heating and cooling. A focused inspection for insurance documentation.',
    outcome: 'The right information, together.',
  },
  commercial: {
    number: '05',
    short: 'Commercial inspection',
    eyebrow: 'SEE THE PROPERTY BEHIND THE NUMBERS',
    headline: 'Invest with',
    accent: 'a clearer picture.',
    image: '/img/campaign/commercial.jpg',
    focus: 'Details with impact.',
    detailImage: '/img/campaign/commercial.jpg',
    detailAlt: 'Commercial building roof and exterior in South Florida',
    cardTitle: 'Due diligence, down to the details.',
    cardCopy:
      'Look at condition, observed deficiencies and potential repair costs as part of the bigger investment decision.',
    outcome: 'Perspective for your next move.',
  },
  progressive: {
    number: '06',
    short: 'Progressive construction',
    eyebrow: 'AN INDEPENDENT LOOK DURING CONSTRUCTION',
    headline: 'Watch your home',
    accent: 'take shape.',
    image: '/img/campaign/construction.jpg',
    focus: 'A closer look, along the way.',
    detailImage: '/img/campaign/construction.jpg',
    detailAlt: 'Exposed framing of a home under construction',
    cardTitle: 'Stay informed as the work moves forward.',
    cardCopy:
      'Coordinate independent inspections around the current stage, site access and upcoming construction milestones.',
    outcome: 'Confidence through the build.',
  },
  'new-construction': {
    number: '07',
    short: 'New construction final',
    eyebrow: 'A NEW HOME. AN INDEPENDENT PERSPECTIVE.',
    headline: 'Before the keys.',
    accent: 'Look a little closer.',
    image: '/img/campaign/completed-home.jpg',
    focus: 'From structure to finish.',
    detailImage: '/img/campaign/inspection-team.jpg',
    detailAlt: 'Diversified inspection team at a residential property',
    cardTitle: 'New is a beginning, not a guarantee.',
    cardCopy:
      'Get an independent look at structural and cosmetic conditions once construction is complete.',
    outcome: 'Start the next chapter informed.',
  },
  maintenance: {
    number: '08',
    short: 'Yearly maintenance',
    eyebrow: 'FOR THE HOME YOU’RE KEEPING',
    headline: 'Home, for',
    accent: 'the long run.',
    image: '/img/campaign/home.jpg',
    focus: 'Care starts with clarity.',
    detailImage: '/img/campaign/inspection-team.jpg',
    detailAlt: 'Diversified inspection team on site at a home',
    cardTitle: 'A little attention. A better plan.',
    cardCopy:
      'Take stock of current conditions, ask about what’s changed, and put your maintenance priorities in perspective.',
    outcome: 'Keep looking after what matters.',
  },
}
for (const [key, detail] of Object.entries(editorial)) Object.assign(serviceLandings[key], detail)

for (const key of ['insurance', 'wind'])
  serviceLandings[key].imageAlt =
    'Aerial view of a canal-front South Florida home and its roof geometry'
for (const key of ['four-point', 'new-construction'])
  serviceLandings[key].imageAlt = 'Completed modern home with large windows and balconies'
