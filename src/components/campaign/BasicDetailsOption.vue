<script setup>
import { nextTick, ref } from 'vue'
import Icon from './Icon.vue'
import QuoteForm from './QuoteForm.vue'

defineProps({ initialDetails: { type: Object, default: () => ({}) } })
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
          >For a tailored inspection price, <strong>the detailed quote is recommended.</strong> If
          you’re missing information, request a callback here.</span
        >
      </p>
      <QuoteForm
        v-if="revealed"
        :initial-details="initialDetails"
        in-quote-builder
        @resume-quote="resumeQuote"
      />
    </div>
  </details>
</template>
