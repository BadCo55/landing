<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/campaign/SiteHeader.vue'
import SiteFooter from '@/components/campaign/SiteFooter.vue'
import QuoteForm from '@/components/campaign/QuoteForm.vue'
import Icon from '@/components/campaign/Icon.vue'
import { trackEvent } from '@/utils/campaign'
import '@/assets/styles/campaign.css'
const route = useRoute()
const audience = computed(
  () =>
    route.params.audience ||
    (route.path === '/insurance-inspection' ? 'insurance-inspection' : 'homebuyer'),
)
const insurance = computed(() => audience.value === 'insurance-inspection')
const copy = computed(
  () =>
    ({
      homebuyer: {
        eyebrow: 'SOUTH FLORIDA HOME INSPECTIONS',
        title: 'A closer look.',
        accent: 'A confident move.',
        description:
          'Look beyond the surface. Get a thorough inspection, clear answers, and repair estimates—so you can make your next move with confidence.',
      },
      realtor: {
        eyebrow: 'A TRUSTED PARTNER FOR SOUTH FLORIDA AGENTS',
        title: 'Clear answers.',
        accent: 'Confident clients.',
        description:
          'Give your clients a complete picture of their property, with thorough inspections, understandable reports, and practical repair estimates.',
      },
      investor: {
        eyebrow: 'SOUTH FLORIDA PROPERTY INSPECTIONS',
        title: 'See the details.',
        accent: 'Know the investment.',
        description:
          'Understand the condition behind the opportunity. Our specialist team and itemized repair estimates help you make a more informed property decision.',
      },
      'insurance-inspection': {
        eyebrow: 'SOUTH FLORIDA INSURANCE INSPECTIONS',
        title: 'The right reports.',
        accent: 'A simpler next step.',
        description:
          'Get the 4-point, wind mitigation, or roof certification inspection your property needs. Our local team will help you confirm the right scope and available times.',
      },
    })[audience.value] || {
      eyebrow: 'SOUTH FLORIDA HOME INSPECTIONS',
      title: 'A closer look.',
      accent: 'A confident move.',
      description:
        'Get a thorough inspection, clear answers, and repair estimates—so you can make your next move with confidence.',
    },
)
function quoteClick(placement, service) {
  trackEvent('request_quote_click', {
    placement,
    audience: audience.value,
    service: service || (insurance.value ? 'Insurance inspection' : 'General home inspection'),
  })
}
const services = [
  {
    number: '01',
    icon: 'home',
    name: 'General home inspections',
    selection: 'General home inspection',
    description: 'A comprehensive look at the home you’re buying, selling, or maintaining.',
    detail: 'Structure · Electrical · Plumbing · HVAC · More',
    tag: 'BUY & SELL WITH CLARITY',
  },
  {
    number: '02',
    icon: 'wind',
    name: 'Insurance inspections',
    selection: '4-point inspection',
    description: 'The property reports you need for your insurance requirements.',
    detail: '4-point · Wind mitigation · Roof certification',
    tag: 'GET THE REPORTS YOU NEED',
  },
  {
    number: '03',
    icon: 'building',
    name: 'Commercial inspections',
    selection: 'Commercial inspection',
    description: 'Understand the condition of your next commercial property investment.',
    detail: 'Building systems · Specialist expertise',
    tag: 'KNOW YOUR INVESTMENT',
  },
  {
    number: '04',
    icon: 'shield',
    name: 'Specialized inspections',
    selection: 'Specialized inspection',
    description: 'A closer look at the areas that need particular attention.',
    detail: 'Pools · Mold · Sewer scopes · Seawalls · More',
    tag: 'LOOK A LITTLE DEEPER',
  },
]
const faqs = [
  {
    q: 'How much does a home inspection cost?',
    a: 'Pricing depends on the property’s size, type, location, and the inspections you need. Complete our guided quote request with your property details, features, and selected services to receive your inspection quote. Our office will confirm the scope and appointment.',
  },
  {
    q: 'How soon can I schedule an inspection?',
    a: 'Call us or send a request with your inspection deadline. Our office will check availability and coordinate the appointment. Saturday inspections and after-hours requests may be available by arrangement; your appointment is confirmed by our team.',
  },
  {
    q: 'When will I receive my report?',
    a: 'Reports are typically delivered within 24 hours. Large properties or homes in poor condition may take up to 48 hours. Reports for Friday and weekend inspections are generally delivered on Monday. Let us know your deadline when scheduling.',
  },
  {
    q: 'What is the difference between a home inspection and a 4-point?',
    a: 'A general home inspection provides a broader assessment of the property’s condition. A 4-point inspection focuses on the roof, electrical, plumbing, and HVAC systems for insurance purposes. A 4-point is not a substitute for a general inspection when buying a home.',
  },
  {
    q: 'Can I attend the inspection?',
    a: 'Yes. We encourage you to attend so you can learn about the property and ask questions. Our team will help you understand the findings and what they mean for your next steps.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'We serve Broward, Miami-Dade, and Palm Beach counties. If your property is outside these areas, contact our office to discuss availability.',
  },
]
const reviews = [
  {
    text: 'His reports are thorough and easily understandable. I trust Chris to deliver accurate, reliable reports, giving both buyers and sellers’ confidence in the transaction.',
    name: 'Debbie DeVito Flynn',
    role: 'One Sotheby’s International Realty',
    initials: 'DF',
  },
  {
    text: 'Their responsiveness and communication exceeded my expectations. I was particularly impressed with how quickly they expedited my request and their overall professionalism.',
    name: 'Justin Lafond',
    role: 'Homeowner',
    initials: 'JL',
  },
  {
    text: 'They went over every single nook and cranny in the house. Christopher was the name of my inspector, and he was very professional, funny, polite, friendly, and he did a phenomenal job.',
    name: 'Bridget Madero',
    role: 'Homeowner',
    initials: 'BM',
  },
]
</script>
<template>
  <div class="campaign campaign--landing" id="top">
    <SiteHeader />
    <main id="main-content">
      <section class="hero-stage" aria-labelledby="hero-title">
        <div class="hero-media">
          <img
            src="/img/campaign/home.jpg"
            alt="Modern home with expansive windows and a pool"
            width="1920"
            height="1143"
            fetchpriority="high"
          />
        </div>
        <div class="hero-shade"></div>
        <div class="wrap hero-layout">
          <div class="hero-copy">
            <p class="hero-eyebrow"><span></span>{{ copy.eyebrow }}</p>
            <h1 id="hero-title">
              {{ copy.title }}<br /><em>{{ copy.accent }}</em>
            </h1>
            <p class="hero-description">{{ copy.description }}</p>
            <div class="hero-actions">
              <RouterLink
                class="button button-primary"
                to="/request-quote"
                @click="quoteClick('hero')"
                >Build my inspection quote <span class="button-icon"><Icon name="arrow" /></span
              ></RouterLink>
              <RouterLink
                class="hero-report-link"
                to="/sample-report"
                @click="trackEvent('sample_report_click', { placement: 'hero' })"
                ><span><Icon name="report" /></span> See a sample report</RouterLink
              >
            </div>
            <p class="hero-reassurance">
              <Icon name="check" /> A quote tailored to your property. No payment required.
            </p>
          </div>
          <div class="hero-location">
            <Icon name="pin" />
            <div>
              <span>ROOTED IN SOUTH FLORIDA</span><strong>Broward · Miami-Dade · Palm Beach</strong>
            </div>
          </div>
        </div>
        <a class="hero-scroll" href="#difference" aria-label="Discover the Diversified difference"
          ><span>THE DETAILS MAKE THE DIFFERENCE</span><Icon name="arrow"
        /></a>
      </section>

      <section class="proof-strip" aria-label="Our experience">
        <div class="wrap proof-grid">
          <div><strong>45,000+</strong><span>inspections performed</span></div>
          <div>
            <strong>1998<span class="stat-prefix">EST.</span></strong
            ><span>local experience, built over decades</span>
          </div>
          <div>
            <strong class="stat-words">Specialists.<br />Working together.</strong
            ><span>a more complete perspective</span>
          </div>
          <div>
            <strong class="stat-words">The findings.<br />And the costs.</strong
            ><span>repair estimates in general reports</span>
          </div>
        </div>
      </section>

      <section id="difference" class="section wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span></span> THE DIVERSIFIED DIFFERENCE</p>
            <h2>One home.<br /><span class="muted-heading">More than one perspective.</span></h2>
          </div>
          <p>
            A home is a collection of complex systems. You deserve a team that understands how they
            work—and a report that helps you understand what comes next.
          </p>
        </div>
        <div class="difference-grid">
          <article>
            <span class="feature-icon"><Icon name="team" /></span>
            <h3>Expertise that goes deeper.</h3>
            <p>
              Our general inspection team brings together building, roofing, and termite expertise,
              with licensed specialists focused on their field.
            </p>
            <span class="feature-foot">THE RIGHT EYES ON THE RIGHT DETAILS</span>
          </article>
          <article>
            <span class="feature-icon"><Icon name="report" /></span>
            <h3>Findings you can act on.</h3>
            <p>
              Detailed photos, clear explanations, and line-item repair estimates help you
              understand the condition—and plan for the costs.
            </p>
            <span class="feature-foot">CLARITY BEYOND THE CHECKLIST</span>
          </article>
          <article>
            <span class="feature-icon"><Icon name="phone" /></span>
            <h3>People you can talk to.</h3>
            <p>
              From choosing the right inspection to understanding your report, our local office and
              inspection team are here for your questions.
            </p>
            <span class="feature-foot">REAL PEOPLE. LOCAL KNOWLEDGE.</span>
          </article>
        </div>
      </section>

      <section class="report-section">
        <div class="wrap report-grid">
          <div class="report-visual">
            <div class="report-stage-label">
              <span class="status-dot"></span> A LOOK INSIDE YOUR REPORT <span>DHI / SAMPLE</span>
            </div>
            <div class="report-paper">
              <img
                src="/img/report/asset13.svg"
                width="612"
                height="792"
                loading="lazy"
                decoding="async"
                alt="Sample Diversified inspection report showing itemized repair estimates"
              />
            </div>
            <div class="report-stamp">
              <Icon name="check" />
              <div>
                <strong>The finding. The photo. The estimate.</strong
                ><span>Connected in one detailed report.</span>
              </div>
            </div>
          </div>
          <div class="report-copy">
            <p class="eyebrow"><span></span> MORE THAN A LIST OF PROBLEMS</p>
            <h2>The details.<br />The bigger picture.</h2>
            <p>
              Your report should make the next decision easier. Our general inspection reports
              connect the details with practical context, so you can negotiate, budget, and move
              forward informed.
            </p>
            <ul class="check-list">
              <li><Icon name="check" /> Clear descriptions of the areas inspected</li>
              <li><Icon name="check" /> Photos that show you what we found</li>
              <li><Icon name="check" /> Itemized estimates for identified repairs</li>
              <li><Icon name="check" /> A team available to explain your findings</li>
            </ul>
            <RouterLink
              class="button button-light"
              to="/sample-report"
              @click="trackEvent('sample_report_click', { placement: 'report_section' })"
              >See the report for yourself <Icon name="diagonal"
            /></RouterLink>
            <p class="report-caption">An actual sample report. No email required.</p>
          </div>
        </div>
      </section>

      <section id="services" class="section wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span></span> THE RIGHT INSPECTION FOR YOUR NEXT STEP</p>
            <h2>
              Your next chapter.<br /><span class="muted-heading">The right inspection.</span>
            </h2>
          </div>
          <p>
            Buying, insuring, or investing? Tell us what you need. We’ll help you match the
            inspection to your property.
          </p>
        </div>
        <div class="services-grid">
          <article v-for="service in services" :key="service.number" class="service-card">
            <div class="service-top">
              <Icon :name="service.icon" /><span>{{ service.number }}</span>
            </div>
            <p class="eyebrow">{{ service.tag }}</p>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
            <div class="service-detail">{{ service.detail }}</div>
            <RouterLink to="/request-quote" @click="quoteClick('service_card', service.selection)"
              >Get a quote <Icon name="arrow"
            /></RouterLink>
          </article>
        </div>
        <p class="service-note">
          <Icon name="phone" /> Not sure which inspection you need?
          <a href="tel:+19542529980" @click="trackEvent('phone_click', { placement: 'services' })"
            >We’ll help you figure it out.</a
          >
        </p>
      </section>

      <section class="reviews-section">
        <div class="wrap">
          <div class="section-heading">
            <div>
              <p class="eyebrow"><span></span> TRUST BUILT ONE INSPECTION AT A TIME</p>
              <h2>Confidence looks<br /><span class="muted-heading">good on you.</span></h2>
            </div>
            <p>
              A few words from the homeowners and real estate professionals who have worked with our
              team.
            </p>
          </div>
          <div class="reviews-grid">
            <figure v-for="review in reviews" :key="review.name">
              <span class="quote-mark" aria-hidden="true">“</span>
              <blockquote>{{ review.text }}</blockquote>
              <figcaption>
                <span class="review-avatar">{{ review.initials }}</span>
                <div>
                  <strong>{{ review.name }}</strong
                  ><span>{{ review.role }}</span>
                </div>
              </figcaption>
            </figure>
          </div>
          <p class="review-source">
            Excerpts from customer testimonials previously shared by Diversified Home Inspections.
          </p>
        </div>
      </section>

      <section id="quote" class="section wrap quote-section">
        <div class="quote-copy">
          <p class="eyebrow"><span></span> YOUR NEXT MOVE STARTS HERE</p>
          <h2>Clarity starts<br /><span class="muted-heading">with your property.</span></h2>
          <p>
            Your property’s details matter. Our guided quote request helps you choose the right
            inspections and understand your inspection cost.
          </p>
          <ol class="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>Tell us about your property.</h3>
                <p>Enter the address, property type, size, age, and features.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Choose your inspections.</h3>
                <p>Select a package, then review the individual services and add-ons.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Get your quote.</h3>
                <p>
                  Share preferred dates and receive a quote based on your property and selections.
                </p>
              </div>
            </li>
          </ol>
          <div class="quote-phone">
            <Icon name="phone" />
            <div>
              <span>Prefer a conversation?</span
              ><a
                href="tel:+19542529980"
                @click="trackEvent('phone_click', { placement: 'quote_section' })"
                >(954) 252-9980</a
              ><small>Monday–Friday · 9am–5pm</small>
            </div>
          </div>
        </div>
        <div class="quote-options">
          <div class="quote-card qualification-card">
            <div class="qualification-top">
              <span class="recommended-label"><Icon name="check" /> RECOMMENDED</span
              ><Icon name="report" />
            </div>
            <p class="eyebrow">YOUR COMPLETE INSPECTION QUOTE</p>
            <h3>A quote that fits<br />your property.</h3>
            <p>
              Complete our guided request to get a quote for the property and services you actually
              need.
            </p>
            <ul class="check-list">
              <li><Icon name="check" /> Property details and additional features</li>
              <li><Icon name="check" /> Inspection packages and service options</li>
              <li><Icon name="check" /> Your preferred inspection dates</li>
            </ul>
            <RouterLink
              class="button button-primary"
              to="/request-quote"
              @click="quoteClick('quote_section')"
              >Build my inspection quote <Icon name="arrow"
            /></RouterLink>
            <p class="qualification-note">
              Have the property address, year built, and total square footage handy. No payment
              required.
            </p>
          </div>
          <details class="callback-option">
            <summary>
              <div>
                <span>DON’T HAVE ALL THE PROPERTY DETAILS YET?</span
                ><strong>Start with the basics. We’ll help with the rest.</strong>
              </div>
              <Icon name="plus" />
            </summary>
            <div class="callback-content">
              <p>
                The detailed quote above is recommended for a tailored inspection price. If you’re
                missing information, leave your contact details below and our team will help you get
                started.
              </p>
              <QuoteForm :audience="audience" />
            </div>
          </details>
        </div>
      </section>

      <section id="faq" class="faq-section">
        <div class="wrap faq-grid">
          <div>
            <p class="eyebrow"><span></span> A LITTLE MORE CLARITY</p>
            <h2>Good questions.<br />Straight answers.</h2>
            <p>
              Still have something on your mind?<br /><a
                href="tel:+19542529980"
                @click="trackEvent('phone_click', { placement: 'faq' })"
                >Give our team a call <Icon name="diagonal"
              /></a>
            </p>
          </div>
          <div class="faq-list">
            <details v-for="faq in faqs" :key="faq.q">
              <summary>{{ faq.q }}<Icon name="plus" /></summary>
              <p>{{ faq.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="closing-cta">
        <div class="wrap">
          <div>
            <p class="eyebrow">ONE CALL DOES IT ALL.</p>
            <h2>Your property. Our expertise.</h2>
          </div>
          <RouterLink class="button button-light" to="/request-quote" @click="quoteClick('closing')"
            >Let’s get started <Icon name="arrow"
          /></RouterLink>
        </div>
      </section>
    </main>
    <SiteFooter />
    <div class="mobile-conversion-bar">
      <a href="tel:+19542529980" @click="trackEvent('phone_click', { placement: 'mobile_bar' })"
        ><Icon name="phone" /> Call DHI</a
      ><RouterLink
        class="button button-primary"
        to="/request-quote"
        @click="quoteClick('mobile_bar')"
        >Build my quote <Icon name="arrow"
      /></RouterLink>
    </div>
  </div>
</template>
