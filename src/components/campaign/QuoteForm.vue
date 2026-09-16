<script setup>
import { nextTick, reactive, ref, watch } from 'vue'
import Icon from './Icon.vue'
import { useAppStore } from '@/stores/appStore'
import {
  createLeadPayload,
  isProductionHost,
  sendLead,
  trackEvent,
  trackLead,
  validateLead,
} from '@/utils/campaign'
const props = defineProps({
  service: { type: String, default: 'I’m not sure — help me choose' },
  audience: { type: String, default: 'homebuyer' },
  initialDetails: { type: Object, default: () => ({}) },
  inQuoteBuilder: { type: Boolean, default: false },
})
const emit = defineEmits(['update:service', 'resume-quote'])
const store = useAppStore()
const form = reactive({
  name: props.initialDetails.name || '',
  email: props.initialDetails.email || '',
  phone: props.initialDetails.phone || '',
  service: props.service,
  address: props.initialDetails.address || '',
  message: '',
  website: '',
})
const errors = ref({})
const status = ref('idle')
const formElement = ref(null)
const statusElement = ref(null)
const preview = !isProductionHost(window.location.hostname)
let started = false
watch(
  () => props.service,
  (value) => {
    form.service = value
  },
)
watch(
  () => form.service,
  (value) => emit('update:service', value),
)
function start() {
  if (started) return
  started = true
  trackEvent('form_start', { form_name: 'Callback Request', audience: props.audience })
}
async function submit() {
  if (status.value === 'pending' || status.value === 'success') return
  errors.value = validateLead(form)
  if (Object.keys(errors.value).length) {
    await nextTick()
    formElement.value?.querySelector('[aria-invalid="true"]')?.focus()
    return
  }
  if (form.website) return
  status.value = 'pending'
  try {
    if (!preview) await sendLead(createLeadPayload(form, store.utmParams, props.audience))
    status.value = preview ? 'preview' : 'success'
    if (!preview) trackLead('Callback Request', form.service, store.utmParams)
    await nextTick()
    statusElement.value?.focus()
  } catch {
    status.value = 'error'
    await nextTick()
    statusElement.value?.focus()
  }
}
</script>
<template>
  <div class="quote-card">
    <template v-if="status === 'success' || status === 'preview'">
      <div ref="statusElement" class="form-success" tabindex="-1" role="status">
        <span class="success-icon"><Icon name="check" /></span>
        <p class="eyebrow">{{ status === 'preview' ? 'PREVIEW COMPLETE' : 'REQUEST RECEIVED' }}</p>
        <h3>
          {{ status === 'preview' ? 'Your form is ready to go.' : 'We’ll be in touch.' }}
        </h3>
        <p>
          {{
            status === 'preview'
              ? 'This is a preview. No request was sent and no conversion was recorded.'
              : 'Thank you. Our office will contact you about your questions and help you with the next step.'
          }}
        </p>
        <p v-if="status === 'success'" class="small-copy">
          Your inspection is not booked until confirmed by our team. Office hours: Monday–Friday,
          9am–5pm.
        </p>
        <button
          v-if="status === 'preview'"
          class="button button-primary"
          type="button"
          @click="status = 'idle'"
        >
          Back to the form <Icon name="arrow" />
        </button>
        <a
          v-else
          class="text-link"
          href="tel:+19542529980"
          @click="trackEvent('phone_click', { placement: 'confirmation' })"
          >Questions? (954) 252-9980 <Icon name="phone"
        /></a>
      </div>
      <button
        v-if="inQuoteBuilder"
        type="button"
        class="text-link callback-resume"
        @click="emit('resume-quote')"
      >
        Continue my detailed quote <Icon name="arrow" />
      </button>
    </template>
    <form v-else ref="formElement" @submit.prevent="submit" @focusin="start" novalidate>
      <div class="form-heading">
        <div>
          <p class="eyebrow">TALK TO OUR TEAM</p>
          <h3>Request a callback.</h3>
        </div>
        <Icon name="report" />
      </div>
      <p class="form-intro">
        {{
          inQuoteBuilder
            ? 'Start with your contact details. Add the property address if you have it, and our team will help with the rest.'
            : 'Leave your contact details and a question for our office.'
        }}
      </p>
      <fieldset :disabled="status === 'pending'" class="form-fields">
        <div class="field">
          <label for="lead-name">Full name <span>*</span></label
          ><input
            id="lead-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            required
            maxlength="120"
            placeholder="Your first and last name"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'error-name' : undefined"
          />
          <p v-if="errors.name" id="error-name" class="field-error">{{ errors.name }}</p>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="lead-email">Email address <span>*</span></label
            ><input
              id="lead-email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              maxlength="254"
              placeholder="you@example.com"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'error-email' : undefined"
            />
            <p v-if="errors.email" id="error-email" class="field-error">{{ errors.email }}</p>
          </div>
          <div class="field">
            <label for="lead-phone">Phone number <span>*</span></label
            ><input
              id="lead-phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              required
              maxlength="25"
              placeholder="(954) 555-0123"
              :aria-invalid="!!errors.phone"
              :aria-describedby="errors.phone ? 'error-phone' : undefined"
            />
            <p v-if="errors.phone" id="error-phone" class="field-error">{{ errors.phone }}</p>
          </div>
        </div>
        <div class="field">
          <label for="lead-service">What kind of inspection? <span>*</span></label
          ><select
            id="lead-service"
            v-model="form.service"
            required
            :aria-invalid="!!errors.service"
          >
            <option>General home inspection</option>
            <option>4-point inspection</option>
            <option>Wind mitigation</option>
            <option>Roof certification</option>
            <option>Commercial inspection</option>
            <option>Specialized inspection</option>
            <option>I’m not sure — help me choose</option>
          </select>
        </div>
        <div class="field">
          <label for="lead-address">Property address <span class="optional">optional</span></label
          ><input
            id="lead-address"
            v-model="form.address"
            type="text"
            autocomplete="street-address"
            maxlength="300"
            placeholder="Street address, city, and ZIP"
          />
        </div>
        <details class="form-details">
          <summary>Add a message or inspection deadline <Icon name="plus" /></summary>
          <div class="field">
            <label for="lead-message">Anything else we should know?</label
            ><textarea
              id="lead-message"
              v-model="form.message"
              rows="3"
              maxlength="2000"
              placeholder="Your timeline, property details, or questions"
            ></textarea>
          </div>
        </details>
        <div class="honeypot" aria-hidden="true">
          <label for="lead-website">Leave this field blank</label
          ><input
            id="lead-website"
            v-model="form.website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </div>
        <p v-if="preview" class="preview-note">
          Preview mode: this form will not send a real request.
        </p>
        <div
          v-if="status === 'error'"
          ref="statusElement"
          class="form-error"
          role="alert"
          tabindex="-1"
        >
          We couldn’t confirm delivery. Please call
          <a href="tel:+19542529980">(954) 252-9980</a> before trying again, so we can check your
          request.
        </div>
        <button
          type="submit"
          class="button button-primary submit-button"
          :aria-busy="status === 'pending'"
        >
          {{ status === 'pending' ? 'Sending your request…' : 'Request a callback'
          }}<Icon v-if="status !== 'pending'" name="arrow" />
        </button>
        <p class="form-consent">
          By submitting, you’re asking Diversified Home Inspections to contact you about this
          request. No payment required.
        </p>
      </fieldset>
      <div class="detailed-quote-link">
        Ready for your inspection price?
        <button v-if="inQuoteBuilder" type="button" @click="emit('resume-quote')">
          Continue my detailed quote <Icon name="diagonal" />
        </button>
        <RouterLink v-else to="/request-quote"
          >Build my inspection quote <Icon name="diagonal"
        /></RouterLink>
      </div>
    </form>
  </div>
</template>
