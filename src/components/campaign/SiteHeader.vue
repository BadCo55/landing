<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from './Icon.vue'
import logo from '@/assets/logo-light.svg'
import { trackEvent } from '@/utils/campaign'
import { inspectionContext, inspectionQuoteLink } from '@/utils/inspectionIntent'
const props = defineProps({ inspectionIntent: { type: String, default: '' } })
const context = computed(() => inspectionContext(props.inspectionIntent))
const quoteTo = computed(() => inspectionQuoteLink(props.inspectionIntent))
const route = useRoute()
const landingPath = computed(
  () =>
    context.value?.path ||
    (['home', 'audience', 'insurance-inspection'].includes(route.name) ? route.path : '/'),
)
</script>
<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <RouterLink to="/" aria-label="Diversified Home Inspections home" class="brand"
        ><img :src="logo" alt="Diversified Home Inspections" width="226" height="81"
      /></RouterLink>
      <nav aria-label="Main navigation">
        <RouterLink :to="{ path: landingPath, hash: '#difference' }">Why Diversified</RouterLink
        ><RouterLink :to="{ path: landingPath, hash: '#services' }">Our inspections</RouterLink
        ><RouterLink :to="{ path: landingPath, hash: '#faq' }">FAQs</RouterLink>
      </nav>
      <a
        class="header-phone"
        aria-label="Call Diversified at (954) 252-9980"
        href="tel:+19542529980"
        @click="trackEvent('phone_click', { placement: 'header' })"
        ><Icon name="phone" /><span
          ><small>LET’S TALK ABOUT YOUR PROPERTY</small><strong>(954) 252-9980</strong></span
        ></a
      >
      <RouterLink
        class="header-quote button button-primary"
        :to="quoteTo"
        @click="trackEvent('request_quote_click', { placement: 'header' })"
        >Get a quote <Icon name="diagonal"
      /></RouterLink>
    </div>
  </header>
</template>
