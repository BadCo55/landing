<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/campaign/SiteHeader.vue'
import SiteFooter from '@/components/campaign/SiteFooter.vue'
import QuoteForm from '@/components/campaign/QuoteForm.vue'
import Icon from '@/components/campaign/Icon.vue'
import { serviceLandings } from '@/data/serviceLandings'
import { inspectionQuoteLink } from '@/utils/inspectionIntent'
import { trackEvent } from '@/utils/campaign'
import '@/assets/styles/service-landings.css'
const route = useRoute()
const page = computed(() => serviceLandings[route.meta.inspection])
const quoteTo = computed(() => inspectionQuoteLink(page.value.key))
const related = computed(() => page.value.related.map((key) => serviceLandings[key]))
const openScope = ref(0)
watch(
  () => page.value.key,
  () => {
    openScope.value = 0
  },
)
function quoteClick(placement) {
  trackEvent('request_quote_click', { placement, inspection_intent: page.value.key })
}
</script>
<template>
  <div class="campaign service-campaign" :class="'service-campaign--' + page.key" :key="page.key">
    <SiteHeader :inspection-intent="page.key" />
    <main id="main-content">
      <section class="service-hero" :aria-label="page.label">
        <div class="service-hero-media">
          <img
            :src="page.image"
            :alt="page.imageAlt"
            width="1800"
            height="1350"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <div class="service-hero-shade"></div>
        <div class="service-hero-content wrap">
          <div class="service-hero-meta">
            <span><span class="service-status-dot"></span>{{ page.short }}</span
            ><span class="service-hero-place"><Icon name="pin" />South Florida</span>
          </div>
          <div class="service-hero-grid">
            <div class="service-hero-copy">
              <p class="service-eyebrow">{{ page.eyebrow }}</p>
              <h1>
                {{ page.headline }}<em>{{ page.accent }}</em>
              </h1>
              <p class="service-hero-intro">{{ page.intro }}</p>
              <a :href="quoteTo" class="service-primary" @click="quoteClick('service_hero')"
                >{{ page.cta }}<span><Icon name="diagonal" /></span
              ></a>
              <p class="service-hero-note">
                A detailed request. A personal follow-up from our team.
              </p>
            </div>
            <aside class="service-hero-dossier">
              <div class="service-dossier-label">
                <span>YOUR INSPECTION, IN FOCUS</span><Icon name="report" />
              </div>
              <h2>{{ page.focus }}</h2>
              <ul>
                <li v-for="(item, index) in page.highlights" :key="item">
                  <span>0{{ index + 1 }}</span
                  >{{ item }}<Icon name="check" />
                </li>
              </ul>
              <a
                href="tel:+19542529980"
                @click="
                  trackEvent('phone_click', {
                    placement: 'service_hero',
                    inspection_intent: page.key,
                  })
                "
                ><span>Have a question?<strong>(954) 252-9980</strong></span
                ><span class="service-dossier-phone"><Icon name="phone" /></span
              ></a>
            </aside>
          </div>
          <div class="service-hero-bottom">
            <span>DIVERSIFIED HOME INSPECTIONS</span
            ><a href="#services">A closer look<Icon name="arrow" /></a
            ><span class="service-edition">INSPECTION {{ page.number }} / 08</span>
          </div>
        </div>
      </section>
      <div class="service-trust wrap">
        <div>
          <span>01</span>
          <p><strong>Local since 1998.</strong> Experience rooted in South Florida.</p>
        </div>
        <div>
          <Icon name="team" />
          <p><strong>A specialist team.</strong> The right people for the details.</p>
        </div>
        <div>
          <Icon name="pin" />
          <p><strong>Three counties. One team.</strong> Broward · Miami-Dade · Palm Beach</p>
        </div>
      </div>
      <section id="services" class="service-scope wrap">
        <div class="service-section-index">
          <span>01 / THE INSPECTION</span><span>{{ page.short }}</span>
        </div>
        <div class="service-scope-intro">
          <h2>{{ page.scopeTitle }}</h2>
          <p>{{ page.scopeIntro }}</p>
        </div>
        <div class="service-scope-layout">
          <div class="service-scope-visual">
            <img
              :src="page.detailImage"
              :alt="page.detailAlt"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
            />
            <div class="service-visual-caption">
              <span><Icon name="shield" />THE DIVERSIFIED PERSPECTIVE</span>
              <h3>{{ page.cardTitle }}</h3>
              <p>{{ page.cardCopy }}</p>
            </div>
          </div>
          <div class="service-scope-list">
            <article
              v-for="(item, index) in page.scope"
              :key="item[1]"
              :class="{ active: openScope === index }"
            >
              <h3>
                <button
                  type="button"
                  :aria-expanded="openScope === index"
                  :aria-controls="'scope-' + index"
                  @click="openScope = openScope === index ? -1 : index"
                >
                  <span class="service-scope-number">0{{ index + 1 }}</span
                  ><span>{{ item[1] }}</span
                  ><Icon :name="openScope === index ? 'close' : 'plus'" />
                </button>
              </h3>
              <div :id="'scope-' + index" v-show="openScope === index" class="service-scope-detail">
                <p>{{ item[2] }}</p>
                <span><Icon :name="item[0]" />{{ page.short }}</span>
              </div>
            </article>
            <p class="service-scope-footnote">
              Your property, access and selected services define the final inspection scope.
            </p>
          </div>
        </div>
      </section>
      <section id="difference" class="service-perspective">
        <div class="wrap">
          <div class="service-section-index">
            <span>02 / WHY IT MATTERS</span><Icon name="diagonal" />
          </div>
          <div class="service-perspective-grid">
            <div>
              <p class="service-eyebrow">{{ page.insightLabel }}</p>
              <h2>{{ page.insightTitle }}</h2>
            </div>
            <div>
              <p>{{ page.insight }}</p>
              <div class="service-takeaway">
                <Icon name="report" />
                <p>{{ page.takeaway }}</p>
              </div>
              <a :href="quoteTo" class="service-text-link" @click="quoteClick('service_insight')"
                >{{ page.cta }}<Icon name="diagonal"
              /></a>
            </div>
          </div>
          <p class="service-outcome">{{ page.outcome }}</p>
        </div>
      </section>
      <section v-if="page.showReport" class="service-report wrap">
        <div class="service-report-preview">
          <img
            src="/img/report/asset2.svg"
            alt="Actual sample page from a Diversified general inspection report"
            width="612"
            height="792"
            loading="lazy"
          /><span><Icon name="report" />AN ACTUAL DIVERSIFIED SAMPLE REPORT</span>
        </div>
        <div>
          <p class="service-eyebrow">THE VALUE IS IN THE DETAILS</p>
          <h2>A report you can<br />actually use.</h2>
          <p>
            Clear observations. Supporting photographs. Repair estimates that put the findings in
            context. Take a look at how our general inspection reports bring the details together.
          </p>
          <RouterLink
            :to="{ path: '/sample-report', query: { inspection: page.key } }"
            class="service-text-link"
            >Open the sample report<Icon name="diagonal"
          /></RouterLink>
          <p class="service-report-note">
            Sample general report shown. Actual reports reflect the property and selected services.
          </p>
        </div>
      </section>
      <section class="service-process wrap">
        <div class="service-section-index">
          <span>03 / FROM HERE</span><span>A PERSONAL FOLLOW-UP. EVERY TIME.</span>
        </div>
        <div class="service-process-grid">
          <div>
            <h2>A clear next step.</h2>
            <p>Tell us what you need.<br />We’ll take it from there.</p>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>
                  {{
                    page.key === 'progressive'
                      ? 'Share the project.'
                      : 'Tell us about the property.'
                  }}
                </h3>
                <p>
                  {{
                    page.key === 'progressive'
                      ? 'Current stage, upcoming work, access and the visits you have in mind.'
                      : 'Location, size, age and the details that help us understand your property.'
                  }}
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Choose the right scope.</h3>
                <p>
                  Review the relevant services and add your priorities. The detailed request helps
                  us get it right.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Connect with our office.</h3>
                <p>
                  Our team follows up to confirm scope, pricing and availability before anything is
                  booked.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section id="faq" class="service-faq wrap">
        <div>
          <p class="service-eyebrow">BEFORE YOU GET STARTED</p>
          <h2>Good questions.<br /><em>Clear answers.</em></h2>
          <a href="tel:+19542529980" class="service-text-link"
            >Speak with our team<Icon name="phone"
          /></a>
        </div>
        <div class="service-faq-list">
          <details v-for="faq in page.faqs" :key="faq[0]">
            <summary>{{ faq[0] }}<Icon name="plus" /></summary>
            <p>{{ faq[1] }}</p>
          </details>
        </div>
      </section>
      <section id="request" class="service-convert">
        <div class="wrap">
          <div class="service-convert-primary">
            <div>
              <p class="service-eyebrow">{{ page.short }} · LET’S GET STARTED</p>
              <h2>Your next step<br /><em>starts here.</em></h2>
              <p>
                Give us the details. Get a personal follow-up from the people who will help you plan
                the inspection.
              </p>
            </div>
            <div class="service-convert-action">
              <a :href="quoteTo" class="service-primary" @click="quoteClick('service_bottom')"
                >{{ page.cta }}<span><Icon name="diagonal" /></span
              ></a>
              <p>
                <Icon name="check" />Detailed request recommended<br /><Icon name="check" />No
                payment to submit
              </p>
            </div>
          </div>
          <details class="service-basic">
            <summary>
              <span
                ><strong>Don’t have all the information yet?</strong
                ><span>Start with the basics and we’ll help with the rest.</span></span
              ><span>Request a callback<Icon name="plus" /></span>
            </summary>
            <div>
              <QuoteForm :service="page.label" :audience="page.key" :inspection-intent="page.key" />
            </div>
          </details>
        </div>
      </section>
      <aside class="service-related wrap" aria-label="Related inspections">
        <div>
          <span>ANOTHER REASON FOR A CLOSER LOOK?</span
          ><RouterLink to="/">All inspections<Icon name="arrow" /></RouterLink>
        </div>
        <RouterLink v-for="item in related" :key="item.key" :to="item.path"
          ><img
            :src="item.image"
            :alt="item.imageAlt"
            width="260"
            height="180"
            loading="lazy" /><span>{{ item.short }}</span
          ><Icon name="diagonal"
        /></RouterLink>
      </aside>
    </main>
    <SiteFooter />
    <div class="service-mobile-cta">
      <a href="tel:+19542529980" aria-label="Call Diversified"><Icon name="phone" />Call</a
      ><a :href="quoteTo" @click="quoteClick('service_mobile')"
        >{{ page.key === 'progressive' ? 'Request project review' : 'Request my inspection'
        }}<Icon name="arrow"
      /></a>
    </div>
  </div>
</template>
