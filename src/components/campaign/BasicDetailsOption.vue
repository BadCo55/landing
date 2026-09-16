<script setup>
import { computed, nextTick, ref } from 'vue'
import Icon from './Icon.vue'
import QuoteForm from './QuoteForm.vue'

import { inspectionContext } from '@/utils/inspectionIntent'
const props = defineProps({
  initialDetails: { type: Object, default: () => ({}) },
  inspectionIntent: { type: String, default: '' },
})
const context = computed(() => inspectionContext(props.inspectionIntent))
const disclosure = ref(null)
const revealed = ref(false)

function onToggle(event) {
  // Mount once on first opening to prefill from the current quote. Keep callback edits on close.
  if (event.target.open) revealed.value = true
}

async function resumeQuote() {
  disclosure.value.open = false
  await nextTick()
  disclosure.value.querySelector('summary')?.focus()
}
</script>

<template>
  <details ref="disclosure" class="basic-details-option" @toggle="onToggle">
    <summary>
      <span class="basic-details-icon"><Icon name="team" /></span>
      <span class="basic-details-copy"
        ><strong>Don’t have all the property details yet?</strong
        ><span>Leave the basics and our team will help you take the next step.</span></span
      >
      <span class="basic-details-action"
        ><span class="basic-details-open-label">Start with the basics</span
        ><span class="basic-details-close-label">Close basic form</span> <Icon name="plus"
      /></span>
    </summary>
    <div class="basic-details-content callback-content">
      <p class="basic-details-recommendation">
        <Icon name="report" /><span
          ><template v-if="inspectionIntent === 'progressive'"
            >For project-specific pricing,
            <strong>the detailed project request is recommended.</strong></template
          ><template v-else
            >For a tailored inspection price,
            <strong>the detailed request is recommended.</strong></template
          >
          If you’re missing information, request a callback here.</span
        >
      </p>
      <QuoteForm
        v-if="revealed"
        :initial-details="initialDetails"
        :service="context?.label"
        :audience="inspectionIntent || 'homebuyer'"
        :inspection-intent="inspectionIntent"
        in-quote-builder
        @resume-quote="resumeQuote"
      />
    </div>
  </details>
</template>
