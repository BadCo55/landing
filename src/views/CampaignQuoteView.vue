<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { inspectionContext, resolveInspectionIntent } from '@/utils/inspectionIntent'
import ProgressiveProjectForm from '@/components/campaign/ProgressiveProjectForm.vue'
import SiteHeader from '@/components/campaign/SiteHeader.vue'
import SiteFooter from '@/components/campaign/SiteFooter.vue'
import RequestQuoteView from './RequestQuoteView.vue'
import Icon from '@/components/campaign/Icon.vue'
import 'primeicons/primeicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/styles/quote-flow.css'
const route = useRoute()
const intent = computed(() => resolveInspectionIntent(route.query.inspection))
const context = computed(() => inspectionContext(intent.value))
</script>
<template>
  <div class="campaign campaign--quote">
    <SiteHeader :inspection-intent="intent" />
    <main id="main-content">
      <div class="wrap quote-intro">
        <RouterLink class="text-link" :to="context?.path || '/'"
          ><Icon name="arrow" class="back-arrow" /> Back to overview</RouterLink
        >
        <div class="quote-intro-row">
          <div>
            <p class="eyebrow">LET’S GET THE DETAILS RIGHT</p>
            <h1>{{ context?.title || 'Let’s plan your inspection.' }}</h1>
          </div>
          <p>
            {{
              context?.guidance ||
              'Tell us about the property and choose the inspections you need. Our office will review your request and follow up with pricing and availability.'
            }}
          </p>
        </div>
      </div>
      <ProgressiveProjectForm v-if="intent === 'progressive'" />
      <div v-else class="quote-flow">
        <RequestQuoteView :key="intent" :inspection-intent="intent" />
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
