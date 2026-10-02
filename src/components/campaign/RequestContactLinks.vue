<script setup>
import { useAppStore } from '@/stores/appStore'
import { computed } from 'vue'
import Icon from './Icon.vue'
import { inspectionQuoteLink, inspectionRequestDestination } from '@/utils/inspectionIntent'
import { trackEvent } from '@/utils/campaign'
const store = useAppStore()
const quoteTo = computed(() =>
  inspectionQuoteLink(store.utmParams, inspectionRequestDestination(props.inspectionIntent)),
)

const props = defineProps({
  placement: { type: String, required: true },
  inspectionIntent: { type: String, default: '' },
})

function track(event) {
  trackEvent(event, {
    placement: props.placement,
    ...(props.inspectionIntent ? { inspection_intent: props.inspectionIntent } : {}),
  })
}
</script>

<template>
  <div class="quote-card request-contact-links">
    <p>Our team can help you plan the next step.</p>
    <p>
      <a
        class="button button-primary"
        :href="quoteTo"
        @click="track('request_quote_click')"
        >Request an inspection <Icon name="arrow"
      /></a>
    </p>
    <p>
      <a class="text-link" href="tel:+19542529980" @click="track('phone_click')"
        ><Icon name="phone" /> Call (954) 252-9980</a
      >
    </p>
    <p class="small-copy">Monday–Friday · 9am–5pm</p>
  </div>
</template>

<style scoped>
.request-contact-links {
  display: grid;
  gap: 1rem;
}
</style>
